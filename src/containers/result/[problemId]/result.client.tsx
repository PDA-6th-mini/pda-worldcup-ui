'use client';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// 데이터 타입 정의
type ResultItem = {
	img_id: number;
	img_name: string;
	win_count: number;
	win_ratio_percent: string;
};

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

export default function ResultClientContainer({
	problemId,
}: ResultContainerProps) {
	const [data, setData] = useState([]); // 각 우승횟수 저장된 배열
	const [names, setNames] = useState([]); // 이미지 이름 저장된 배열
	const [problemName, setProblemName] = useState(''); // 현재 문제 이름

	const doughnutData = {
		labels: names, // 각 이미지 이름 배열
		datasets: [
			{
				label: 'ProblemName',
				data: data,
				backgroundColor: backgroundColor,
				borderColor: borderColor,
				borderWidth: 1,
			},
		],
	};

	useEffect(() => {
		const fetchRatioData = async () => {
			try {
				console.log('요청 problemId:', problemId);
				const res = await fetch(
					`http://localhost:3000/api/result-ratio/${problemId}`
				);
				const json = await res.json();

				const problemName = json.data.problem_name;
				const resultArray = json.data.result;

				const cntArray = resultArray.map((item: any) => item.cnt);
				const nameArray = resultArray.map((item: any) => item.img_name);

				setProblemName(problemName); // ✅ 추가
				setData(cntArray);
				setNames(nameArray);
			} catch (err) {
				console.error('도넛 차트 데이터를 불러오는 데 실패했습니다.', err);
			}
		};

		fetchRatioData();
	}, []);

	return (
		<div>
			<p>{problemName}</p>
			<div style={styles.wrapper}>
				<div style={styles.imageWrapper}>
					<div style={styles.imageContainer}>
						<img
							src="/images/gaeul1.JPG"
							alt="1등 이미지"
							style={styles.image}
						/>
						<div style={styles.overlayText}>아이브 가을</div>
					</div>
				</div>

				<div style={styles.chartWrapper}>
					<Doughnut data={doughnutData} />
				</div>
			</div>
		</div>
	);
}

const styles: {
	[key: string]: React.CSSProperties;
} = {
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
	imageWrapper: {
		width: '40vw',
		maxWidth: '450px',
	},
	imageContainer: {
		position: 'relative',
		width: '100%', // imageWrapper 안에서 꽉 채움
	},
	image: {
		width: '100%',
		height: 'auto',
		borderRadius: '12px',
		objectFit: 'cover',
	},
	overlayText: {
		position: 'absolute',
		top: '85%',
		left: '50%',
		transform: 'translateX(-50%)',
		color: 'white',
		fontSize: '1.5rem',
		fontWeight: 'bold',
		textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
		pointerEvents: 'none',
	},
	chartWrapper: {
		width: '40vw',
		maxWidth: '500px',
		aspectRatio: '1 / 1',
	},
};
