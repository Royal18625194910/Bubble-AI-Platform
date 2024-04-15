/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "p2.qhimg.com",
      "p6.qhimg.com",
      "p4.qhimg.com",
      "p5.qhimg.com",
      "p0.qhimg.com",
    ],
  },
};

export default nextConfig;
