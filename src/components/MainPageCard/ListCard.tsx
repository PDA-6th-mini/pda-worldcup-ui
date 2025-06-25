'use client';

import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

type Card = {
	id: string;
	title: string;
	imgUri: string;
};

export const ListCard = ({ id, title, imgUri }: Card) => {
	const router = useRouter();

	return (
		<Card className="h-100 shadow-sm">
			<Card.Img variant="top" src={imgUri} alt={`${title} 이미지`} />
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<ButtonGroup>
					<Button
						variant="primary"
						onClick={() => router.push(`/problem/${id}`)}
					>
						시작하기
					</Button>
					<Button variant="primary" onClick={() => router.push('')}>
						랭킹보기
					</Button>
					<Button variant="primary" onClick={() => router.push('')}>
						공유하기
					</Button>
				</ButtonGroup>
			</Card.Body>
		</Card>
	);
};
