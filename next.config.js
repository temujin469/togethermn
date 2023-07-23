/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src *;
  script-src *;
  child-src *;
  style-src *;
  font-src *;
`;
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
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig
