'use client';

import { FC } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut as DoughnutComponent } from 'react-chartjs-2';

import { backgroundColor, borderColor } from '@/constants/chart';

interface Props {
	problemName: string;
	cntArray: number[];
	nameArray: string[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const Doughnut: FC<Props> = ({ problemName, cntArray, nameArray }) => {
	const doughnutData = {
		labels: nameArray, // 각 이미지 이름 배열
		datasets: [
			{
				label: problemName,
				data: cntArray,
				backgroundColor,
				borderColor,
				borderWidth: 1,
			},
		],
	};

	return <DoughnutComponent data={doughnutData} />;
};
