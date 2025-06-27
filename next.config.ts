import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pda-world-cup.s3.ap-northeast-2.amazonaws.com',
				pathname: '/images/**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:3001/:path*',
			},
		];
	},
	reactStrictMode: false,
};

export default nextConfig;
