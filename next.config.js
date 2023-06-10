/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    appDir: false,
  },
  output: 'standalone',
};

module.exports = nextConfig;
