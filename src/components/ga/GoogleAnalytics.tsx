'use client';

import Script from 'next/script';

import { GA_TRACKING_ID } from '@/lib/gtag';

export const GoogleAnalytics = () => {
	return (
		<>
			<Script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-V6Q1CWZ6RS"
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
        });       
        `,
				}}
			/>
		</>
	);
};
