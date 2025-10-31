import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.demonslayer-api.com',
      },
    ],
  },
  cacheComponents: true,
}

export default nextConfig
