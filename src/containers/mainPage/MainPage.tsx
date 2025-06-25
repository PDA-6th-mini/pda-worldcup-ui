'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ListCard } from '@/components/MainPageCard';

type Card = {
	id: string;
	title: string;
	imgUri: string;
};

const mockProblems: Card[] = [
	{
		id: '1',
		title: 'React 기초',
		imgUri: 'https://via.placeholder.com/300x180?text=React',
	},
	{
		id: '2',
		title: 'JavaScript 비동기',
		imgUri: 'https://via.placeholder.com/300x180?text=JS+Async',
	},
	{
		id: '3',
		title: '자료구조: 트리',
		imgUri: 'https://via.placeholder.com/300x180?text=Tree',
	},
	{
		id: '4',
		title: '알고리즘 기초',
		imgUri: 'https://via.placeholder.com/300x180?text=Algorithm',
	},
	{
		id: '5',
		title: 'CSS 레이아웃',
		imgUri: 'https://via.placeholder.com/300x180?text=CSS',
	},
];

export const MainPageContainer = () => {
	const [problems, setProblems] = useState<Card[]>([]);

	useEffect(() => {
		setProblems(mockProblems);
	}, []);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const response = await fetch('http://localhost:5000/main');
	// 		const data = await response.json();

	// 		setProblems(data);
	// 	};
	// 	getData();
	// }, []);

	return (
		<Container className="my-4">
			<Row xs={1} md={2} lg={3} className="g-4">
				{problems.map((problem) => (
					<Col key={problem.id}>
						<ListCard
							id={problem.id}
							title={problem.title}
							imgUri={problem.imgUri}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
};
