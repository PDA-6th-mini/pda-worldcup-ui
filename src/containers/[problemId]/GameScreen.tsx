import MatchView from '@/components/GameScreen';
import { Container, Row, Col } from 'react-bootstrap';

export interface GameScreenContainerProps {
	params: Promise<{
		problemId: string;
	}>;
}
export default async function GameScreenContainer({
	params,
}: GameScreenContainerProps) {
	const { problemId } = await params;
	console.log('problem_id => ', problemId);
	return (
		<div className="bg-black w-100 min-vh-100 d-flex align-items-center justify-content-center">
			<Container className="bg-black text-white d-flex flex-column align-items-center justify-content-start pt-4 m-0 p-0">
				{/* 상단 타이틀 */}
				<Row className="text-center mb-4">
					<Col>
						<h1 className="fs-3 fw-bold">{problemId}</h1>
						<br />
					</Col>
				</Row>
				<Row>
					<Col>
						<MatchView />
					</Col>
				</Row>
			</Container>
		</div>
	);
}
