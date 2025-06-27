'use client';

import Link from 'next/link';

import { Card, Button, ButtonGroup } from 'react-bootstrap';

import { useToast } from '@/hooks/useToast';

import styles from './ListCard.module.css';

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
	const { handleShowToast } = useToast();

	const shareLink = async (id: number) => {
		const problemUrl = `${window.location.origin}/${id}`;
		try {
			await navigator.clipboard.writeText(problemUrl);
			handleShowToast(
				'성공!',
				'클립보드에 링크가 복사 되었습니다!😺',
				'success'
			);
		} catch (err) {
			console.error('링크 복사를 실패했습니다.', err);
			handleShowToast('실패!', '링크 복사를 실패했습니다!😹', 'danger');
		}
	};

	return (
		<Card
			style={{
				width: '100%',
				maxWidth: '700px',
				margin: '0 auto 1rem',
				borderRadius: '1rem',
				overflow: 'hidden',
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
				border: 'none',
			}}
			className={styles.cardHover}
		>
			<div style={{ display: 'flex', width: '100%' }}>
				<Card.Img
					variant="top"
					src={thumbNail_1}
					alt={`${title} 이미지1`}
					style={{ width: '50%', height: 280, objectFit: 'cover' }}
				/>
				<Card.Img
					variant="top"
					src={thumbNail_2}
					alt={`${title} 이미지2`}
					style={{ width: '50%', height: 280, objectFit: 'cover' }}
				/>
			</div>
			<Card.Body style={{ padding: '1rem' }}>
				<Card.Title style={{ fontSize: '1.25rem', fontWeight: 600 }}>
					{title}
				</Card.Title>
				<Card.Text style={{ fontSize: '0.95rem', color: '#495057' }}>
					{description}
				</Card.Text>
				<ButtonGroup className="w-100 mt-2 d-flex justify-content-between">
					<Link href={`/problems/${id}`}>
						<Button variant="outline-primary" className={styles.btnHover}>
							시작하기
						</Button>
					</Link>
					<Link href={`/ranking/${id}`}>
						<Button variant="outline-primary" className={styles.btnHover}>
							랭킹보기
						</Button>
					</Link>
					<Button
						variant="outline-primary"
						onClick={() => shareLink(id)}
						className={styles.btnHover}
					>
						공유하기
					</Button>
				</ButtonGroup>
			</Card.Body>
		</Card>
	);
};
