import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { proxy } from "./src/proxy"; // <-- IMPORTANT

export function middleware(request: NextRequest) {
    return proxy(request);
}

export const config = {
    matcher: [
        // Match all routes except Next.js internal routes, static assets, and Server Actions
        // This ensures Server Actions, data fetching, and HMR are never intercepted
        "/((?!_next/action|_next/data|_next/webpack-hmr|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};
