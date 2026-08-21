/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is plain files, hostable on any static
  // host or CDN, with no server runtime to maintain.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
