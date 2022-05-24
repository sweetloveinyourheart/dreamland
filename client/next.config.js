/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPS_API_KEY: process.env.MAPS_API_KEY,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    api: process.env.SERVER_SIDE_API, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    api: process.env.CLIENT_SIDE_API
  },
  images: {
    domains: ['cdn.chotot.com'],
  },
}

module.exports = nextConfig
