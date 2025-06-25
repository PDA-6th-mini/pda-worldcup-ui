'use client';

import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

type Card = {
	id: number;
	title: string;
	description: string | null;
	thumbNail_1: string;
	thumbNail_2: string;
};

export const ListCard = ({
	id,
	title,
	description,
	thumbNail_1,
	thumbNail_2,
}: Card) => {
	const router = useRouter();

	return (
		<Card className="h-100 shadow-sm">
			<Card.Img variant="top" src={thumbNail_1} alt={`${title} 이미지`} />
			<Card.Img variant="top" src={thumbNail_2} alt={`${title} 이미지`} />
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
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
