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
    ],
  },
  // Добавляем переменные окружения
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
};

module.exports = withNextIntl(nextConfig);