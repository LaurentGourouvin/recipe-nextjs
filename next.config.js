/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
  publicRuntimeConfig: {
    API_URL: "http://localhost:5050/api",
  },
};

module.exports = nextConfig;
