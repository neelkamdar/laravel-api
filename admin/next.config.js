/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: "https://fastkart-frontend-rest.vercel.app/",
    URL: "https://your_api_primary_domain/api",
    storageURL: "https://your_api_primary_domain",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "laravel.pixelstrap.net",
      },
      {
        protocol: "http",
        hostname: "laravel.pixelstrap.net",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
