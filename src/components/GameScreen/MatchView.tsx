import { ToastProvider } from '@/hooks/ToastContext';
import { Img } from '@/types/api/img';
import { Problem } from '@/types/api/problem';

import MatchViewClient from './MatchView.client';

export default async function MatchView({
	fetchData,
}: {
	fetchData: (Img & Problem)[];
}) {
	return (
		<ToastProvider>
			<MatchViewClient fetchData={fetchData} />;
		</ToastProvider>
	);
}
