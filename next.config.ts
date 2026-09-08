import type { NextConfig } from "next";

// Static export for GitHub Pages at https://pmdevsolutions.github.io/second-gear/
const isPages = process.env.GITHUB_PAGES === "true";

const basePath = isPages ? "/second-gear" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  // next/image does not prefix static export paths, so components read this.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
