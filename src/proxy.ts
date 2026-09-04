import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const url = request.nextUrl.toString();
  const hostname = request.nextUrl.hostname?.toLowerCase() || '';
  const hostHeader = request.headers.get('host')?.toLowerCase() || '';
  const method = request.method;

  // CRITICAL: Skip ALL Next.js internal routes FIRST (before any validation)
  // This prevents interference with Server Actions, data fetching, and HMR
  // Check for Server Actions first (most critical)
  const nextActionHeader = request.headers.get('next-action');
  const contentType = request.headers.get('content-type') || '';
  const isServerAction =
    pathname.startsWith('/_next/action') ||     // Server Actions route (MUST be first)
    nextActionHeader !== null ||                 // Server Action header
    (method === 'POST' && contentType.includes('text/plain') && pathname.includes('_next')); // Server Action POST requests

  if (
    isServerAction ||
    pathname.startsWith('/_next/data') ||        // Data fetching routes
    pathname.startsWith('/_next/webpack-hmr') || // Hot Module Replacement
    pathname.startsWith('/_next/static') ||      // Static assets
    pathname.startsWith('/_next/image') ||       // Image optimization
    pathname.startsWith('/_next/') ||           // All other Next.js internal routes
    pathname.startsWith('/api/') ||             // API routes (may use Server Actions)
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/i)
  ) {
    return NextResponse.next();
  }

  // --- STRICT URL RESTRICTION ---
  // Only allow /, /privacy-policy, /terms-of-service, /refund-policy, /contact-us
  const allowedPaths = [
    '/',
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/contact-us',
    '/robots.txt',
    '/sitemap.xml',
    '/.well-known/',
    '/.well-known/apple-app-site-association',
    '/.well-known/assetlinks.json',
    '/astrologer-profile',
    '/add-money',
    '/pooja-details',
    '/sitemap-pages.xml',
    '/sitemap-blog.xml',
    // '/login',
    // '/otp',
    // '/register',
    // '/thank-you',
    '/pooja',
    '/astrologers'
  ];

  // Remove trailing slash for comparison (except for home /)
  const normalizedPath = pathname !== '/' && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  if (!allowedPaths.includes(normalizedPath) && !normalizedPath.startsWith('/astrologers/') && !normalizedPath.startsWith('/pooja/')) {
    // If path is not allowed, redirect to homepage
    return NextResponse.redirect(new URL('/', request.url));
  }
  // --- END OF STRICT URL RESTRICTION ---

  // Allow production domain without validation (from environment variable)
  const allowedDomain = process.env.ALLOWED_DOMAIN || 'balajiastroguide.com';
  const baseDomain = allowedDomain.replace(/^www\./, ''); // Remove www if present

  // Check if request is from allowed domain
  if (
    hostname === allowedDomain ||
    hostname === `www.${baseDomain}` ||
    hostname === baseDomain ||
    hostname.endsWith('.' + baseDomain) ||
    hostHeader === allowedDomain ||
    hostHeader === `www.${baseDomain}` ||
    hostHeader === baseDomain ||
    hostHeader.endsWith('.' + baseDomain)
  ) {
    return NextResponse.next();
  }

  // In development mode, allow all localhost requests without validation
  if (process.env.NODE_ENV === 'development') {
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.includes('localhost') ||
      hostname.includes('127.0.0.1') ||
      hostHeader.includes('localhost') ||
      hostHeader.includes('127.0.0.1') ||
      url.includes('localhost') ||
      url.includes('127.0.0.1') ||
      url.includes('0.0.0.0')
    ) {
      return NextResponse.next();
    }
  }

  // XSS patterns - check in query params and pathname only
  // Made more specific to avoid false positives with legitimate JSON/form data
  const xssPatterns = [
    /eval\s*\(/i,                    // eval( - more specific
    /<script[^>]*>/i,                // <script> tags - more specific
    /javascript\s*:/i,               // javascript: protocol
    /\bonerror\s*=/i,                // onerror= attribute
    /\bonload\s*=/i,                 // onload= attribute
    /<iframe[^>]*src/i,              // iframe with src
    /<img[^>]*onerror/i,             // img with onerror
    // Removed /function\(/i as it's too aggressive and matches legitimate JSON
  ];

  // Command injection patterns - more specific
  const commandPatterns = [
    /\bwget\b|\bcurl\b|\bbash\s|\bsh\s/i,  // Commands with word boundaries
    /\.sh\b/i,  // .sh file extension
    /xmrig/i,   // Specific malware name
    /sex\.sh/i, // Specific malicious file
    /\&\&|\|\|/i,  // Command chaining (&& ||) but not single ;
    /system\(/i,
    /exec\(/i,
    /spawn\(/i,
    /child_process/i,
    /process\.exec/i,
    /rm\s+-rf/i,
    /chmod\s+\+x/i,
    /chmod\s+777/i,
    /\bnc\s+|\bnetcat/i,
    /python\s+-c/i,
    /perl\s+-e/i,
  ];

  // Suspicious URL patterns - only check for external IPs (not localhost)
  const suspiciousUrlPatterns = [
    /http:\/\/(?!localhost|127\.0\.0\.1)\d+\.\d+\.\d+\.\d+:\d+\//i,  // External IP with port
    /https:\/\/(?!localhost|127\.0\.0\.1)\d+\.\d+\.\d+\.\d+:\d+\//i, // External IP with port
  ];

  // Check query parameters for XSS and commands
  // Only validate GET requests or query params (not POST body data)
  for (const [key, value] of searchParams.entries()) {
    // Skip validation for empty or very long values (likely not malicious in query params)
    if (!value || value.length > 1000) continue;

    // Check XSS patterns
    if (xssPatterns.some(pattern => pattern.test(value))) {
      return new NextResponse('Bad Request', { status: 400 });
    }
    // Check command patterns
    if (commandPatterns.some(pattern => pattern.test(value))) {
      return new NextResponse('Bad Request', { status: 400 });
    }
  }

  // Skip validation for POST/PUT/PATCH requests to avoid interfering with form data
  // These methods typically send data in the body, not query params
  const isDataSubmission = ['POST', 'PUT', 'PATCH'].includes(method);

  // Only check pathname for XSS and commands (not request bodies)
  // Pathname validation is safe as it's part of the URL structure
  if (xssPatterns.some(pattern => pattern.test(pathname))) {
    return new NextResponse('Bad Request', { status: 400 });
  }
  if (commandPatterns.some(pattern => pattern.test(pathname))) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // Check full URL only for suspicious external IPs (not localhost)
  if (suspiciousUrlPatterns.some(pattern => pattern.test(url))) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // Check request headers for command patterns only (not XSS)
  // Be more lenient with headers to avoid false positives
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';

  // Only check for obvious command injection in headers, skip if looks legitimate
  if (userAgent && userAgent.length < 500) {
    if (commandPatterns.some(pattern => pattern.test(userAgent))) {
      return new NextResponse('Bad Request', { status: 400 });
    }
  }

  if (referer && referer.length < 500) {
    if (commandPatterns.some(pattern => pattern.test(referer))) {
      return new NextResponse('Bad Request', { status: 400 });
    }
  }

  // Development logging for debugging
  if (process.env.NODE_ENV === 'development' && isDataSubmission) {
    const contentType = request.headers.get('content-type') || '';
    // Log in development to help debug issues
    if (contentType.includes('application/json') || contentType.includes('multipart/form-data')) {
      // Request is properly formatted, allow it through
    }
  }

  // Preserve all headers and allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except Next.js internal routes and static assets
    // This ensures Server Actions, data fetching, and HMR are never intercepted
    // Note: The function itself also checks for these paths for double protection
    '/((?!_next/action|_next/data|_next/webpack-hmr|_next/static|_next/image|favicon.ico).*)',
  ],
};

