'use client';

import { FC } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut as DoughnutComponent } from 'react-chartjs-2';

import { backgroundColor, borderColor } from '@/constants/chart';

interface Props {
	problemName: string;
	cntArray: number[];
	nameArray: string[];
	urls: string[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const Doughnut: FC<Props> = ({
	problemName,
	cntArray,
	nameArray,
	urls,
}) => {
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

	const getChartOptions = (urls: string[]) => ({
		plugins: {
			tooltip: {
				enabled: false,
				external: function (context: any) {
					const tooltipModel = context.tooltip;
					let tooltipEl = document.getElementById('chartjs-tooltip');

					if (!tooltipEl) {
						tooltipEl = document.createElement('div');
						tooltipEl.id = 'chartjs-tooltip';
						tooltipEl.style.position = 'absolute';
						tooltipEl.style.pointerEvents = 'none';
						tooltipEl.style.transition = 'all .1s ease';
						tooltipEl.style.zIndex = '1000';
						document.body.appendChild(tooltipEl);
					}

					if (tooltipModel.opacity === 0) {
						tooltipEl.style.opacity = '0';
						return;
					}

					const index = tooltipModel.dataPoints?.[0]?.dataIndex;
					const label = tooltipModel.dataPoints?.[0]?.label;
					const imageUrl = urls[index];

					tooltipEl.innerHTML = `
						<div style="background: white; border: 1px solid #ccc; border-radius: 8px; padding: 8px;">
							<strong>${label}</strong><br/>
							<img src="${imageUrl}" width="100" height="100" style="object-fit: cover; border-radius: 4px;" />
						</div>
					`;

					const canvas = context.chart.canvas;
					const rect = canvas.getBoundingClientRect();
					tooltipEl.style.opacity = '1';
					tooltipEl.style.left =
						rect.left + window.pageXOffset + tooltipModel.caretX + 'px';
					tooltipEl.style.top =
						rect.top + window.pageYOffset + tooltipModel.caretY + 'px';
				},
			},
		},
	});

	return (
		<DoughnutComponent data={doughnutData} options={getChartOptions(urls)} />
	);
};
