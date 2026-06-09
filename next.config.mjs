/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid stale filesystem cache/chunk issues during local development on Windows.
      config.cache = { type: "memory" };
    }

    return config;
  },
};

export default nextConfig;
