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

	const doughnutData = {
		labes: names, // 각 이미지 이름 배열
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
				const cntArray = json.data.map((item: any) => item.cnt);
				const nameArray = json.data.map((item: any) => item.img_name);
				setData(cntArray);
				setNames(nameArray);
				console.log('응답 결과:', json);
			} catch (err) {
				console.error('도넛 차트 데이터를 불러오는 데 실패했습니다.', err);
			}
		};

		fetchRatioData();
	}, []);

	return (
		<div>
			<p>결과이미지자리</p>
			<Doughnut data={doughnutData} />
		</div>
	);
}
