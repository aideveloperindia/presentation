/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure client-side only modules work correctly
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignore html2canvas and jspdf on server-side
      config.externals = config.externals || [];
      config.externals.push({
        'html2canvas': 'commonjs html2canvas',
        'jspdf': 'commonjs jspdf',
      });
    }
    return config;
  },
};

module.exports = nextConfig;
