import { Container, Row, Col } from 'react-bootstrap';

import MatchView from '@/components/pages/GameScreen';
import { fetchData } from '@/services/user-service';

export interface GameScreenContainerProps {
	params: Promise<{
		problemId: string;
	}>;
}
export default async function GameScreenContainer({
	params,
}: GameScreenContainerProps) {
	const { problemId } = await params;
	const { data } = await fetchData(problemId);

	return (
		<div className="bg-black w-100 min-vh-100 d-flex align-items-center justify-content-center">
			<Container className="bg-black text-white d-flex flex-column align-items-center justify-content-start pt-4 m-0 p-0 pb-5">
				{/* 상단 타이틀 */}
				<Row className="text-center mb-4">
					<Col>
						<h1 className="fs-3 fw-bold">{data[0].name}</h1>
						<br />
					</Col>
				</Row>
				<Row>
					<Col>
						<MatchView fetchData={data} />
					</Col>
				</Row>
			</Container>
		</div>
	);
}
