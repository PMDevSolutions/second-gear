import type { NextConfig } from "next";

// Static export for GitHub Pages at https://pmdevsolutions.github.io/second-gear/
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPages ? "/second-gear" : "",
  images: { unoptimized: true },
};

export default nextConfig;
