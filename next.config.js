/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

const exposes = {
  "./Transfer": "./pages/retail/index.tsx",
  "./AddTransferFess": "./pages/transfer-fees/add.tsx",
  "./AddTransferRecords": "./pages/transfer-records/add.tsx",
  "./ViewTransferRecords": "./pages/transfer-records/view.tsx",
  "./MFProvider": "./providers/MFProvider.tsx",
  "./pages-map": "./pages-map.ts",
};
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer, dev }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.output.publicPath = "auto";

    if (!dev) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "retail",
          filename: "static/chunks/remoteEntry.js",
          exposes,
          shared: {
            sonner: {
              requiredVersion: "^2.0.0",
              singleton: true,
            },
          },
          extraOptions: {
            debug: true,
            exposePages: true,
            enableImageLoaderFix: true,
            enableUrlLoaderFix: true,
          },
        }),
      );
    }

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
