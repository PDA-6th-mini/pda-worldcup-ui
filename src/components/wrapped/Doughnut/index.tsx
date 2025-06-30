'use client';

import { FC, useEffect } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut as DoughnutComponent } from 'react-chartjs-2';

import { backgroundColor, borderColor } from '@/constants/chart';

ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
	problemName: string;
	cntArray: number[];
	nameArray: string[];
	urls: string[];
}

export const Doughnut: FC<Props> = ({
	problemName,
	cntArray,
	nameArray,
	urls,
}) => {
	//const tooltipRef = useRef(null);
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
	useEffect(() => {
		return () => {
			const tooltip = document.getElementById('chartjs-tooltip');
			if (tooltip) tooltip.remove();
		};
	}, []);

	const getChartOptions = (urls: string[]) => ({
		plugins: {
			tooltip: {
				enabled: false,
				external: function (context: { chart: ChartJS; tooltip: any }) {
					const tooltipModel = context.tooltip;
					let tooltipEl = document.getElementById('chartjs-tooltip');

					// 툴팁 DOM 요소가 없으면 생성
					if (!tooltipEl) {
						tooltipEl = document.createElement('div');
						tooltipEl.id = 'chartjs-tooltip';
						tooltipEl.style.position = 'absolute';
						tooltipEl.style.pointerEvents = 'none';
						tooltipEl.style.transition = 'all .1s ease';
						tooltipEl.style.zIndex = '1000';
						document.body.appendChild(tooltipEl);
					}

					// 툴팁이 사라졌을 때
					if (tooltipModel.opacity === 0) {
						tooltipEl.style.opacity = '0';
						return;
					}

					const dataPoint = tooltipModel.dataPoints?.[0];
					if (!dataPoint) return;

					const index = dataPoint.dataIndex;
					const label = dataPoint.label;
					const imageUrl = urls[index];

					// 툴팁 콘텐츠 구성
					tooltipEl.innerHTML = `
				<div style="
				  background: white;
				  border: 1px solid #ccc;
				  border-radius: 8px;
				  padding: 8px;
				  box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
				">
				  <strong>${label}</strong><br/>
				  <img src="${imageUrl}" width="100" height="100"
					style="object-fit: cover; border-radius: 4px;" />
				</div>
			  `;

					// 툴팁 위치 지정
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
