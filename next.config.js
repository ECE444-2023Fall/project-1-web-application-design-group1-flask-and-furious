/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : 'https://clubhub-backend.vercel.app/api/:path*'
      }
    ];
  },
  images: {
    domains: ['yqrgbzoauzaaznsztnwb.supabase.co']
  }
};

module.exports = nextConfig;
