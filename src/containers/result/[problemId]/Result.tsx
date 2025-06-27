import { Doughnut } from '@/components/Doughnut';
import { chartStyles as styles } from '@/constants/chart';
import { fetchResultImg } from '@/services/image';
import { fetchRatioData } from '@/services/result';

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
	const { problemName, cntArray, nameArray } = await fetchRatioData(problemId);

	return (
		<div>
			{/* 문제 이름 배너 */}
			<div style={styles.banner}>
				<h2>{problemName} 우승</h2>
			</div>

			<div style={styles.wrapper}>
				<div style={styles.imageWrapper}>
					<div style={styles.imageContainer}>
						<img
							src={resultImg?.img_url}
							alt="1등 이미지"
							style={styles.image}
						/>
						<div style={styles.overlayText}>
							{resultImg?.img_name ?? '결과 이미지'}
						</div>
					</div>
				</div>
				<div style={styles.chartWrapper}>
					<Doughnut
						problemName={problemName}
						cntArray={cntArray}
						nameArray={nameArray}
					/>
				</div>
			</div>
		</div>
	);
};

export default ResultContainer;
