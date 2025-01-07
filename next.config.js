/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  experimental: {
    appDir: true, // Keep this if you're using the app router
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
