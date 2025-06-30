import { Doughnut } from '@/components/wrapped/Doughnut';
import { chartStyles as styles } from '@/constants/chart';
import { fetchRatioData } from '@/services/result';

interface Props {
	params: Promise<{
		problemId: number;
	}>;
}
export const RankingContainer = async ({ params }: Props) => {
	const { problemId } = await params;
	const { problemName, cntArray, nameArray, urls } =
		await fetchRatioData(problemId);
	return (
		<div>
			{/* 문제 이름 배너 */}
			<div style={styles.banner}>
				<h2>{problemName} 랭킹</h2>
			</div>
			<div style={styles.wrapper}>
				{cntArray.length === 0 ? (
					<div style={styles.message}>우승 결과가 없습니다.</div>
				) : (
					<div style={styles.chartWrapper}>
						<Doughnut
							problemName={problemName}
							cntArray={cntArray}
							nameArray={nameArray}
							urls={urls}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
