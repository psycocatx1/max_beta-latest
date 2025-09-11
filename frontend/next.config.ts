import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin(
  "./src/lib/intl/request.ts",
);

const nextConfig: NextConfig = {
  typescript: {
    // Отключает проверку типов во время билда Next.js (ошибки по папке backend)
    ignoreBuildErrors: true,
  },
  sassOptions: {
    implementation: 'sass-embedded',
  },
  eslint: {
    // Конкретизирует проверку ESLint во время билда Next.js
    dirs: ['src']

  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '146.103.122.171',
        port: '3001',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://146.103.122.171:3001/api',
    NEXT_PUBLIC_STATIC_URL: process.env.NEXT_PUBLIC_STATIC_URL || 'http://146.103.122.171:3001',
  },
};

module.exports = withNextIntl(nextConfig);