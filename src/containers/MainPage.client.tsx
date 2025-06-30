'use client';

import { useEffect, useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import { ListCard } from '@/components/pages/MainPageCard';
import { getProblemData } from '@/services/problem';
import { Card } from '@/types/card';
import { Cursor } from '@/types/cursor';

export const MainPageClientContainer = () => {
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['mainProblems', 'infinite'],
			queryFn: ({ pageParam }: { pageParam?: Cursor }) =>
				getProblemData(false, pageParam),
			getNextPageParam: (lastPage: {
				data: Card[];
				nextCursor: Cursor | null;
			}) => lastPage.nextCursor,
			initialPageParam: undefined,
		});

	const observerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!observerRef.current || !hasNextPage) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 }
		);

		const el = observerRef.current;
		observer.observe(el);

		return () => {
			if (el) observer.unobserve(el);
		};
	}, [hasNextPage, fetchNextPage]);

	const cards: Card[] = data?.pages.flatMap((page) => page.data) ?? [];

	return (
		<Container className="my-4">
			<Row xs={1} md={3} lg={4} className="g-4">
				{cards.length === 0 && (
					<div className="text-center py-5 text-muted fs-5">로딩중.</div>
				)}
				{cards.map((problem: Card) => (
					<Col key={problem.id}>
						<ListCard {...problem} />
					</Col>
				))}
			</Row>

			<div
				ref={observerRef}
				style={{ height: '60px' }}
				className="text-center my-4 d-flex justify-content-center align-items-center"
			>
				{isFetchingNextPage && (
					<>
						<Spinner
							animation="border"
							role="status"
							size="sm"
							className="me-2"
						/>
						<span>로딩 중... ⏳</span>
					</>
				)}
				{!hasNextPage && cards.length > 0 && (
					<span className="text-success fs-5">모든 문제를 다 불러왔어요!</span>
				)}
			</div>
		</Container>
	);
};
