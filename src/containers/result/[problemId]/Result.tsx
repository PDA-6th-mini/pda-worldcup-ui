import { Doughnut } from '@/components/wrapped/Doughnut';
import { chartStyles } from '@/constants/chart';
import { fetchResultImg } from '@/services/image';
import { fetchRatioData } from '@/services/result';

import styles from './Result.module.css';

interface Props {
	params: Promise<{
		problemId: number;
	}>;
	searchParams: Promise<{
		img_id: string;
	}>;
}

const ResultContainer = async ({ params, searchParams }: Props) => {
	const { problemId } = await params;
	const { img_id } = await searchParams;
	const resultImg = await fetchResultImg(img_id);
	const { problemName, cntArray, nameArray, urls } =
		await fetchRatioData(problemId);

	return (
		<div>
			{/* 문제 이름 배너 */}
			<div style={chartStyles.banner}>
				<h2>{problemName} 우승</h2>
			</div>

			<div className={styles.wrapper}>
				<div className={styles.imageWrapper}>
					<div style={chartStyles.imageContainer}>
						<img
							src={resultImg?.img_url}
							alt="1등 이미지"
							style={chartStyles.image}
						/>
						<div style={chartStyles.overlayText}>
							{resultImg?.img_name ?? '결과 이미지'}
						</div>
					</div>
				</div>
				<div className={styles.chartWrapper}>
					<Doughnut
						problemName={problemName}
						cntArray={cntArray}
						nameArray={nameArray}
						urls={urls}
					/>
				</div>
			</div>
		</div>
	);
};

export default ResultContainer;
