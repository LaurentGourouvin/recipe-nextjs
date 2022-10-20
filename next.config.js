/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "./",
  // assetPrefix: "http://recipe.laurent-gourouvin", PRODUCTION
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "laurent-gourouvin.fr"],
    formats: ["image/avif", "image/webp"],
  },
  publicRuntimeConfig: {
    API_URL: "http://localhost:5050/api",
    // API_URL: "http://laurent-gourouvin.fr:5050/api", PRODUCTION
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
};

module.exports = nextConfig;
