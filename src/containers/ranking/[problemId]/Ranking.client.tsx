'use client';

import { useEffect, useState } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { fetchRatioData } from '@/services/result';

ChartJS.register(ArcElement, Tooltip, Legend);
// props 타입 정의
interface ResultContainerProps {
	problemId: number;
}

const backgroundColor = [
	'rgba(255, 99, 132, 0.2)',
	'rgba(54, 162, 235, 0.2)',
	'rgba(255, 206, 86, 0.2)',
	'rgba(75, 192, 192, 0.2)',
	'rgba(153, 102, 255, 0.2)',
	'rgba(255, 159, 64, 0.2)',
	'rgba(199, 199, 199, 0.2)',
	'rgba(83, 102, 255, 0.2)',
	'rgba(201, 203, 207, 0.2)',
	'rgba(100, 255, 218, 0.2)',
	'rgba(255, 102, 204, 0.2)',
	'rgba(102, 255, 178, 0.2)',
	'rgba(255, 178, 102, 0.2)',
	'rgba(178, 102, 255, 0.2)',
	'rgba(102, 178, 255, 0.2)',
	'rgba(255, 102, 102, 0.2)',
];

const borderColor = [
	'rgba(255, 99, 132, 1)',
	'rgba(54, 162, 235, 1)',
	'rgba(255, 206, 86, 1)',
	'rgba(75, 192, 192, 1)',
	'rgba(153, 102, 255, 1)',
	'rgba(255, 159, 64, 1)',
	'rgba(199, 199, 199, 1)',
	'rgba(83, 102, 255, 1)',
	'rgba(201, 203, 207, 1)',
	'rgba(100, 255, 218, 1)',
	'rgba(255, 102, 204, 1)',
	'rgba(102, 255, 178, 1)',
	'rgba(255, 178, 102, 1)',
	'rgba(178, 102, 255, 1)',
	'rgba(102, 178, 255, 1)',
	'rgba(255, 102, 102, 1)',
];

export default function RankingClientContainer({
	problemId,
}: ResultContainerProps) {
	const [data, setData] = useState<number[]>([]);
	const [names, setNames] = useState<string[]>([]);
	const [problemName, setProblemName] = useState('');

	const doughnutData = {
		labels: names, // 각 이미지 이름 배열
		datasets: [
			{
				label: problemName,
				data: data,
				backgroundColor: backgroundColor,
				borderColor: borderColor,
				borderWidth: 1,
			},
		],
	};

	useEffect(() => {
		(async () => {
			const { problemName, cntArray, nameArray } =
				await fetchRatioData(problemId);
			setProblemName(problemName);
			setData(cntArray);
			setNames(nameArray);
		})();
	}, [problemId]);

	return (
		<div>
			{/* 문제 이름 배너 */}
			<div style={styles.banner}>
				<h2>{problemName} 랭킹</h2>
			</div>
			<div style={styles.wrapper}>
				{data.length === 0 ? (
					<div style={styles.message}>우승 결과가 없습니다.</div>
				) : (
					<div style={styles.chartWrapper}>
						<Doughnut data={doughnutData} />
					</div>
				)}
			</div>
		</div>
	);
}

const styles: {
	[key: string]: React.CSSProperties;
} = {
	banner: {
		width: '100%',
		backgroundColor: '#f5f5f5',
		textAlign: 'center',
		padding: '1rem 0',
		fontSize: '1.8rem',
		fontWeight: 'bold',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		zIndex: 1,
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'row', // ✅ 좌우 정렬
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		padding: '3vh',
		gap: '5vw', // 이미지와 차트 간격
		flexWrap: 'wrap', // 화면 줄어들면 아래로 줄바꿈
	},
	chartWrapper: {
		width: '40vw',
		maxWidth: '500px',
		aspectRatio: '1 / 1',
	},
};
