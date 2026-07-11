import type { NextConfig } from "next";

/**
 * Static export build for CloudFront + S3 hosting.
 *
 * Everything that used to live in `headers()` / `redirects()` / middleware
 * must now be configured at the edge. See DEPLOYMENT.md for the matching
 * CloudFront Function (redirects + index rewrites) and Response Headers
 * Policy (CSP, HSTS, and the rest of the security header set).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // CloudFront serves the exported files directly; there is no image
    // optimizer at request time. Source images are pre-sized in /public.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.mdtechspire.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
