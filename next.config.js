/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tech-comm-nextjs.s3.amazonaws.com'
      },
    ],
  },
}

module.exports = nextConfig
