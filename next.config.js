/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self' http://147.182.246.185:1337;
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';
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
