import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    config.output.publicPath = 'auto';

    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'hostApp',
          filename: 'static/runtime/remoteEntry.js',
          remotes: {
            remoteApp: `remoteApp@${process.env.REMOTE_APP_URL}/_next/static/chunks/remoteEntry.js`
          },
          // exposes: {
          //   "./accessibility": "./src/contexts/accessibility.ts",
          //   "./AccessibilityProvider": "./src/contexts/AccessibilityProvider.tsx",
          // },
          shared: {
            react: {
              singleton: true,
              // eager: true,
              requiredVersion: false
            },
            'react-dom': {
              singleton: true,
              // eager: true,
              requiredVersion: false
            },
          },
          extraOptions: {},
        })
      );
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        'remoteApp/Button': false,
        'remoteApp/HeaderContainer': false,
        'remoteApp/Menu': false,
        'remoteApp/HomeApp': false,
        'remoteApp/TransactionApp': false,
      };
    }
    return config;
  },
};

export default nextConfig;
