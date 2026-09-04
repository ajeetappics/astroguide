import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "appic-all-project-07.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_ASTROLOGER_URL:
      process.env.NEXT_PUBLIC_ASTROLOGER_URL,

    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL,

    NEXT_PUBLIC_URL:
      process.env.NEXT_PUBLIC_URL,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // FIXED CSP — Safe + Server Actions Compatible
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self' https:;
              script-src 'self' 'unsafe-inline';
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: https:;
              font-src 'self' data:;
              connect-src 'self' https:;
              frame-ancestors 'none';
              base-uri 'self';
            `.replace(/\s+/g, " "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
