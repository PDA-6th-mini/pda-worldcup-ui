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
		<Card
			style={{
				width: '100%',
				maxWidth: '700px',
				margin: '0 auto',
				height: 'auto',
				marginBottom: '0.5rem',
				borderRadius: '0px',
			}}
			className="shadow-sm"
		>
			<div style={{ display: 'flex', width: '100%' }}>
				<Card.Img
					variant="top"
					src={thumbNail_1}
					alt={`${title} 이미지`}
					style={{
						width: '50%',
						height: 280,
						objectFit: 'cover',
						borderRadius: 0,
					}}
				/>
				<Card.Img
					variant="top"
					src={thumbNail_2}
					alt={`${title} 이미지`}
					style={{
						width: '50%',
						height: 280,
						objectFit: 'cover',
						borderRadius: 0,
					}}
				/>
			</div>
			<Card.Body
				style={{
					padding: '0.75rem',
				}}
			>
				<Card.Title style={{ fontSize: '1rem' }}>{title}</Card.Title>
				<Card.Text style={{ fontSize: '0.85rem' }}>{description}</Card.Text>
				<ButtonGroup size="sm">
					<Button
						variant="primary"
						onClick={() => router.push(`/${id}`)}
						style={{
							background: 'white',
							color: '#03045E',
							borderColor: '#03045E',
						}}
					>
						시작하기
					</Button>
					<Button
						variant="primary"
						onClick={() => router.push('')}
						style={{
							backgroundColor: 'white',
							color: '#023E8A',
							borderColor: '#023E8A',
						}}
					>
						랭킹보기
					</Button>
					<Button
						variant="primary"
						onClick={() => router.push('')}
						style={{
							color: '#0077B6',
							background: 'white',
							borderColor: '#0077B6',
						}}
					>
						공유하기
					</Button>
				</ButtonGroup>
			</Card.Body>
		</Card>
	);
};
