import { Geist, Geist_Mono } from 'next/font/google';

import { GoogleAnalytics } from '@/components/ga/GoogleAnalytics';
import Navbar from '@/components/layouts/Navbar';
import QueryClientProvider from '@/components/QueryClientProvider';
import { ToastProvider } from '@/hooks/ToastContext';

import type { Metadata } from 'next';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'PDA World Cup',
	description: '프로디지털아카테미 이상형 월드컵',
	openGraph: {
		images: 'https://pda-worldcup.panghae.site/og_image.jpg',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider>
			<ToastProvider>
				<html lang="en">
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					>
						<GoogleAnalytics />
						<Navbar />
						{children}
					</body>
				</html>
			</ToastProvider>
		</QueryClientProvider>
	);
}
