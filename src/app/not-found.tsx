'use client';

import Link from 'next/link';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function NotFound() {
	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: '80vh' }}
		>
			<Row className="w-100 justify-content-center">
				<Col xs={12} md={8} lg={6}>
					<Card className="text-center shadow">
						<Card.Body>
							<Card.Title
								as="h2"
								className="mb-3"
								style={{ fontWeight: 'bold', color: '#dc3545' }}
							>
								페이지를 찾을 수 없습니다
							</Card.Title>
							<Card.Text className="mb-4">
								요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
								<br />홈 화면으로 돌아가시겠어요?
							</Card.Text>
							<Link href="/" passHref legacyBehavior>
								<Button variant="primary" size="lg">
									홈으로 이동
								</Button>
							</Link>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
