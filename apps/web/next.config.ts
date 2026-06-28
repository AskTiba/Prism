import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['db', 'shared'],
  env: {
    AUTH_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.AUTH_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
