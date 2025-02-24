module.exports = {

  reactStrictMode: false,
  productionBrowserSourceMaps: false,

  // experimental: {
  //   appDir: true,
  // },

  webpack(config, { isServer }) {
    // Enable source maps in development mode
    if (!isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'another-example.com',
      },
    ],
  },
};
