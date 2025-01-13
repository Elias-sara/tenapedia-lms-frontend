/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_UPLOAD_URL: process.env.NEXT_PUBLIC_UPLOAD_URL,
    NEXT_PUBLIC_STUDENT_API_URL: process.env.NEXT_PUBLIC_STUDENT_API_URL,
  },
  images: {
    domains: ['localhost', 'tenapedia-lms-backend-1.onrender.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tenapedia-lms-backend-1.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig;
