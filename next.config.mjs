/** @type {import("next").NextConfig} */
const nextConfig = {
  distDir: "dist/client",
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
