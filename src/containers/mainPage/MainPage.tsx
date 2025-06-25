'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ListCard } from '@/components/MainPageCard';

type Card = {
	id: number;
	title: string;
	description: string | null;
	thumbNail_1: string;
	thumbNail_2: string;
};

const mockProblems = [
	{
		problem_id: 1,
		name: '문제 A',
		description: null,
		images: [
			{
				img_id: 3,
				img_url: 'a3.jpg',
			},
			{
				img_id: 1,
				img_url: 'a1.jpg',
			},
			{
				img_id: 2,
				img_url: 'a2.jpg',
			},
		],
	},
	{
		problem_id: 2,
		name: '문제 B',
		description: '이런거 나 조하애',
		images: [
			{
				img_id: 4,
				img_url: 'b1.jpg',
			},
			{
				img_id: 5,
				img_url: 'b2.jpg',
			},
			{
				img_id: 6,
				img_url: 'b3.jpg',
			},
		],
	},
];

export const MainPageContainer = () => {
	const [problems, setProblems] = useState<Card[]>([]);

	useEffect(() => {
		const parsed: Card[] = mockProblems.map((problem) => {
			const images = problem.images;

			const data: Card = {
				id: problem.problem_id,
				title: problem.name,
				description: problem.description,
				thumbNail_1: images[0].img_url,
				thumbNail_2: images[1].img_url,
			};

			return data;
		});
		setProblems(parsed);
	}, []);

	return (
		<Container className="my-4">
			<Row xs={1} md={2} lg={3} className="g-4">
				{problems.map((problem) => (
					<Col key={problem.id}>
						<ListCard
							id={problem.id}
							title={problem.title}
							description={problem.description}
							thumbNail_1={problem.thumbNail_1}
							thumbNail_2={problem.thumbNail_2}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
};
