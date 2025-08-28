/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ytimg.com', 'localhost'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig 