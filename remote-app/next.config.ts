import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'standalone',
  basePath: '',
  assetPrefix: '',
  webpack: (config, { isServer }) => {
    config.output.publicPath = 'auto';

    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'remoteApp',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './Button': './src/components/Button.tsx',
            './HeaderContainer': './src/components/HeaderContainer/HeaderContainer.tsx',
            './Menu': './src/components/Menu/Menu.tsx',
            './HomeApp': './src/components/HomeApp/index.tsx',
            './TransactionApp': './src/components/TransactionApp/index.tsx'
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false
            },
            "react-redux": { singleton: true },
            '@reduxjs/toolkit': { singleton: true },
          },
          extraOptions: {},
        })
      );
    }
    return config
  },
};

export default nextConfig;
