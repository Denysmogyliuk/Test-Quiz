import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po$/,
      use: '@lingui/loader',
    })
    return config
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
  images: {
    domains: [],
  },
}

export default nextConfig
