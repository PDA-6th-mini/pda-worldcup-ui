import React from 'react';

export const backgroundColor = [
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

export const borderColor = [
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

export const chartStyles: {
	[key: string]: React.CSSProperties;
} = {
	banner: {
		width: '100%',
		backgroundColor: '#f5f5f5',
		textAlign: 'center',
		padding: '1rem 0',
		fontSize: '1.8rem',
		fontWeight: 'bold',
		color: 'black',
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
		color: '',
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
