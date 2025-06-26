'use client';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { useSearchParams } from 'next/navigation';
import { Img } from '@/types/api/img';

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

export default function ResultClientContainer({
	problemId,
}: ResultContainerProps) {
	const [data, setData] = useState<number[]>([]);
	const [names, setNames] = useState<string[]>([]);
	const [problemName, setProblemName] = useState('');
	const [resultImg, setResultImg] = useState<Img | null>(null);
	const searchParams = useSearchParams();

	const imgId = searchParams.get('img_id');

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

	// 2. 결과 이미지 가져오기
	useEffect(() => {
		const fetchResultImg = async () => {
			if (!imgId) return;
			try {
				const res = await fetch(
					`http://localhost:3000/api/resultImg?img_id=${imgId}`
				);
				const json = await res.json();
				setResultImg(json.data); // { img_name, img_url }
				console.log('이미지json', json.data);
			} catch (err) {
				console.error('결과 이미지를 불러오는 데 실패했습니다.', err);
			}
		};

		fetchResultImg();
	}, []);

	// 2. 결과 이미지 가져오기
	useEffect(() => {
		const fetchResultImg = async () => {
			if (!imgId) return;
			try {
				const res = await fetch(
					`http://localhost:3000/api/resultImg?img_id=${imgId}`
				);
				const json = await res.json();
				setResultImg(json.data); // { img_name, img_url }
				console.log('이미지json', json.data);
			} catch (err) {
				console.error('결과 이미지를 불러오는 데 실패했습니다.', err);
			}
		};

		fetchResultImg();
	}, []);

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
					<Doughnut data={doughnutData} />
				</div>
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
