import { FC } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { ListCard } from '@/components/pages/MainPageCard';
import { getProblemData } from '@/services/problem';

export const MainPageContainer: FC = async () => {
	const problems = await getProblemData();
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
