import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typedRoutes: false,
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`
			}
		];
	}
};

export default nextConfig;
