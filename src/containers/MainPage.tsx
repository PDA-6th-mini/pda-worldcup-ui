import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import { getProblemData } from '@/services/problem';

import { MainPageClientContainer } from './MainPage.client';

export const MainPageContainer = async () => {
	const queryClient = new QueryClient();
	const result = await getProblemData(true);

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['mainProblems', 'infinite'],
		queryFn: async () => result,
		initialPageParam: undefined,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MainPageClientContainer />
		</HydrationBoundary>
	);
};
