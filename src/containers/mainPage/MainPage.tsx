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

export const MainPageContainer = () => {
	const [problems, setProblems] = useState<any[]>([]);

	useEffect(() => {
		const getProblemData = async () => {
			const response = await fetch('http://localhost:3000/api/main');
			const responseBody = await response.json();

			console.log(responseBody);

			const parsed: Card[] = responseBody.data.map((problem: any) => {
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
		};

		getProblemData();
	}, []);

	return (
		<Container className="my-4">
			<Row xs={1} md={3} lg={4} className="g-4">
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
