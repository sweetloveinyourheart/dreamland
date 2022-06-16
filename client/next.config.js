/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  env: {
    MAPS_API_KEY: process.env.MAPS_API_KEY,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    api: process.env.SERVER_SIDE_API
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    api: process.env.CLIENT_SIDE_API
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
