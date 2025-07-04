import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageView = (url: URL) => {
	if (typeof window !== 'undefined') {
		window.gtag('config', NEXT_PUBLIC_GA_ID as string, {
			page_location: url,
		});
	}
};

export const event = (
	action: Gtag.EventNames,
	{ event_category, event_label, value }: Gtag.EventParams
) => {
	if (process.env.NODE_ENV === 'development') {
		return true;
	}
	window.gtag('event', action, {
		event_category,
		event_label,
		value,
	});
};

export const useGtag = () => {
	const pathname = usePathname(); // Get current route

	// Save pathname on component mount into a REF
	const savedPathNameRef = useRef(pathname);

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			return;
		}

		const handleRouteChange = (url: URL) => {
			pageView(url);
		};

		if (savedPathNameRef.current !== pathname) {
			handleRouteChange(new URL(pathname, window.location.origin));
			// Update REF
			savedPathNameRef.current = pathname;
		}
	}, [pathname]);
};
