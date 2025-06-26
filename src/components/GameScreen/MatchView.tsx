import { Img } from '@/types/api/img';
import { Problem } from '@/types/api/problem';

import MatchViewClient from './MatchView.client';

export default async function MatchView({
	fetchData,
}: {
	fetchData: (Img & Problem)[];
}) {
	return <MatchViewClient fetchData={fetchData} />;
}
