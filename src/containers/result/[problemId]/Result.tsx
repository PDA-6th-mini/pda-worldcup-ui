import ResultClientContainer from './result.client';

interface Props {
	params: Promise<{
		problemId: number;
	}>;
}

const ResultContainer = async ({ params }: Props) => {
	const { problemId } = await params;
	return <ResultClientContainer problemId={problemId} />;
};

export default ResultContainer;
