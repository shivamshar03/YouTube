/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'commondatastorage.googleapis.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      '@/components/header': require('path').resolve(__dirname, 'components/Header.tsx'),
      '@/components/sidebar': require('path').resolve(__dirname, 'components/Sidebar.tsx'),
      '@/components/quick-start-guide': require('path').resolve(__dirname, 'stubs/Empty.tsx'),
      '@/components/ui/button': require('path').resolve(__dirname, 'stubs/Empty.tsx'),
      '@/components/ui/alert': require('path').resolve(__dirname, 'stubs/Empty.tsx'),
      '@/components/upload-form': require('path').resolve(__dirname, 'stubs/Empty.tsx'),
    })
    return config
  },
}

module.exports = nextConfig


