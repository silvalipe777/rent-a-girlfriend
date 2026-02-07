/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(@metamask\/sdk|@coinbase\/wallet-sdk|@base-org\/account|@gemini-wallet\/core|porto|porto\/internal|@safe-global\/safe-apps-sdk|@safe-global\/safe-apps-provider|@walletconnect\/ethereum-provider)$/,
      })
    );
    return config;
  },
};

export default nextConfig;
