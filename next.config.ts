import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vegastudios.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
