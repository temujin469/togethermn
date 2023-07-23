/** @type {import('next').NextConfig} */

// Before defining your Security Headers
// add Content Security Policy directives using a template string.
 
const ContentSecurityPolicy = `
  default-src 'self' http://147.182.246.185:1337 *;
  script-src 'self';
  child-src http://147.182.246.185:1337 *;
  style-src 'self' *;
  font-src 'self' *;
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


// const ContentSecurityPolicy = `
//   default-src 'self' vercel.live;
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live;
//   style-src 'self' 'unsafe-inline';
//   img-src * blob: data:;
//   media-src 'none';
//   connect-src *;
//   font-src 'self';
// `.replace(/\n/g, "");

module.exports = nextConfig
