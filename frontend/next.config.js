/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bufbuild/connect-query"],
<<<<<<< HEAD
  /*async headers() {
    return [
      {
        source: '/start-vr',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  }, FOR FFMPEG */
=======
  images: {
    unoptimized: true,
  },
>>>>>>> ea6fedb24535684a05a687eedcffbfd375c5ca45
};

module.exports = nextConfig;
