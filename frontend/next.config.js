/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  transpilePackages: ["@bufbuild/connect-query"],
  images: {
    unoptimized: true,
  },

};

module.exports = nextConfig;
