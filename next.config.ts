import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
    ],
  },
  async rewrites() {
    // Proxy code-server locally so it appears same-origin at /code
    return [
      {
        source: "/code/:path*",
        destination: "http://127.0.0.1:8080/:path*",
      },
      // Handle code-server login redirects that don't include /code prefix
      {
        source: "/login",
        destination: "http://127.0.0.1:8080/login",
      },
      // Handle VS Code static files (stable version hash paths)
      {
        source: "/stable-:hash/static/:path*",
        destination: "http://127.0.0.1:8080/stable-:hash/static/:path*",
      },
      // Handle other VS Code static file patterns
      {
        source: "/_static/:path*",
        destination: "http://127.0.0.1:8080/_static/:path*",
      },
      // Handle VS Code web worker and other assets
      {
        source: "/static/:path*",
        destination: "http://127.0.0.1:8080/static/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        // Loosen headers for the embedded code-server path only
        source: "/code/:path*",
        headers: [
          // Allow our app to iframe this path
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Minimal CSP to allow VS Code web app and websockets
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; connect-src 'self' ws: wss: http: https: blob: data:; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https: http:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' data: https: http:; frame-ancestors 'self'; worker-src 'self' blob:;",
          },
          // Make sure COOP/COEP don't block embedding
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        // Same headers for code-server login route
        source: "/login",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; connect-src 'self' ws: wss: http: https: blob: data:; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https: http:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' data: https: http:; frame-ancestors 'self'; worker-src 'self' blob:;",
          },
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        // Headers for VS Code static files
        source: "/stable-:hash/static/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; connect-src 'self' ws: wss: http: https: blob: data:; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https: http:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' data: https: http:; frame-ancestors 'self'; worker-src 'self' blob:;",
          },
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        // Headers for other static files
        source: "/_static/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; connect-src 'self' ws: wss: http: https: blob: data:; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https: http:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' data: https: http:; frame-ancestors 'self'; worker-src 'self' blob:;",
          },
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
      {
        // Headers for static assets
        source: "/static/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; connect-src 'self' ws: wss: http: https: blob: data:; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https: http:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' data: https: http:; frame-ancestors 'self'; worker-src 'self' blob:;",
          },
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
