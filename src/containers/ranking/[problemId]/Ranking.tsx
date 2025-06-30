import { Doughnut } from '@/components/wrapped/Doughnut';
import { fetchRatioData } from '@/services/result';

import styles from './Ranking.module.css';

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
			<div className={styles.banner}>
				<h2 style={{ padding: '1rem' }}>{problemName} 랭킹</h2>
			</div>
			<div className={styles.wrapper}>
				{cntArray.length === 0 ? (
					<div className={styles.message}>우승 결과가 없습니다.</div>
				) : (
					<div className={styles.chartWrapper}>
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
