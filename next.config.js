/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['i.pinimg.com', 'lh3.googleusercontent.com', 'lh5.googleusercontent.com', 'res.cloudinary.com', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
