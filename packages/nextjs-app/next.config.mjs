/**
 * @ Author: willy
 * @ CreateTime: 2024-04-07 16:22:51
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-11 17:42:26
 * @ Description: next配置文件
 */
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', //当环境变量ANALYZE为true时开启
})

const isProd = ['production'].includes(process.env.NODE_ENV)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    additionalData: '@import "@/styles/index.scss";',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.willysliang.com',
      },
    ],
  },
  /** 重定向 - 默认将feed重定向至 /public/rss/feed.xml */
  async redirects() {
    return [
      {
        source: '/feed',
        destination: '/rss/feed.xml',
        permanent: true,
      },
    ]
  },
  /** 转发 */
  rewrites: async () => {
    if (!isProd) {
      return [
        // {
        //   source: '/api/:slug*',
        //   destination: '/api/handler/:slug*',
        // },
        // {
        //   source: '/:path*.html',
        //   destination: '/:path*',
        // },
      ]
    } else {
      return []
    }
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
