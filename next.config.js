/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    app_name: 'CGS',
    api_url: 'http://localhost:8080/',
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
