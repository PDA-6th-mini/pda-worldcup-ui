import MatchViewClient from './MatchView.client';
import { Img } from '@/types/api/img';
import { Problem } from '@/types/api/problem';

export default async function MatchView({
	fetchData,
}: {
	fetchData: (Img & Problem)[];
}) {
	return <MatchViewClient fetchData={fetchData} />;
}
