/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "images.unsplash.com", "res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig
