import RankingClientContainer from './Ranking.client';

interface Props {
	params: Promise<{
		problemId: number;
	}>;
}
export const RankingContainer = async ({ params }: Props) => {
	const { problemId } = await params;
	return <RankingClientContainer problemId={problemId} />;
};

export default RankingContainer;
