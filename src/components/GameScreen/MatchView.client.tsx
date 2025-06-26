'use client';

import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import Denque from 'denque';
import { useRef, useEffect, useState } from 'react';
import { Img } from '@/types/api/img';
import { Problem } from '@/types/api/problem';
import { useRouter } from 'next/navigation';

export default function MatchViewClient({
	fetchData,
}: {
	fetchData: (Img & Problem)[];
}) {
	const router = useRouter();
	const [image1, setImage1] = useState<Img>();
	const [image2, setImage2] = useState<Img>();
	const [match, setMatch] = useState(0);
	const [round, setRound] = useState('16강');
	const [roundMatch, setRoundMatch] = useState(8);
	const [selected, setSelected] = useState<'left' | 'right' | null>(null);
	const queue = useRef(new Denque<Img>());

	useEffect(() => {
		fetchData.forEach((data) => {
			queue.current.push(data);
		});
		setImage1(queue.current.shift());
		setImage2(queue.current.shift());
	}, []);

	useEffect(() => {
		if (match == 15) {
			const { img_id, problem_id } = queue.current.shift()!;
			router.replace(`/result/${problem_id}?img_id=${img_id}`);
		}
		if (match === 0) return;
		setImage1(queue.current.shift());
		setImage2(queue.current.shift());
		if (match === 14 || match === 12 || match === 8)
			setRoundMatch((prev) => prev / 2);
		if (match >= 14) setRound('결승');
		else if (match >= 12) setRound('4강');
		else if (match >= 8) setRound('8강');
	}, [match]);

	const clickImg = (rl: boolean) => {
		if (!image1 || !image2 || selected) return;
		setSelected(rl ? 'left' : 'right');
		setTimeout(() => {
			if (rl) queue.current.push(image1);
			else queue.current.push(image2);
			setMatch((prev) => prev + 1);
			setSelected(null);
		}, 1000);
	};

	if (!image1 || !image2) return null;
	return (
		<>
			<style jsx>{`
				.match-image {
					transition: all 0.4s ease;
					cursor: pointer;
				}
				.match-image:hover {
					transform: scale(1.05);
					filter: brightness(1.05);
				}
				.match-text {
					transition: all 0.8s ease;
				}
				.selected {
					transform: translateX(0) scale(1.1);
					z-index: 10;
				}
				.disappear {
					opacity: 0;
				}
			`}</style>

			<Container className="text-white text-center m-0">
				<h2 className="fs-4 fs-sm-3 fw-bold mb-4">
					{round}&nbsp;&nbsp;{(match % roundMatch) + 1}/{roundMatch}
				</h2>
				<Row className="align-items-center justify-content-center">
					<Col xs={5} className="d-flex flex-column align-items-center">
						<div
							className={`match-image ${selected === 'left' ? 'selected' : ''} ${
								selected === 'right' ? 'disappear' : ''
							}`}
							style={{ width: '450px', height: '550px', position: 'relative' }}
						>
							<Image
								onClick={() => clickImg(true)}
								src={image1.img_url}
								alt={image1.img_name}
								fill
								style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
								className="shadow"
							/>
						</div>
						<br />
						<div
							className={`match-text mt-2 fs-5 fw-semibold ${
								selected === 'left' ? 'selected' : ''
							} ${selected === 'right' ? 'disappear' : ''}`}
						>
							{image1.img_name}
						</div>
					</Col>

					<Col
						xs={2}
						className="d-flex justify-content-center align-items-center"
					>
						<span className="text-warning fs-2 fw-bold">VS</span>
					</Col>

					<Col xs={5} className="d-flex flex-column align-items-center">
						<div
							className={`match-image ${selected === 'right' ? 'selected' : ''} ${
								selected === 'left' ? 'disappear' : ''
							}`}
							style={{ width: '450px', height: '550px', position: 'relative' }}
						>
							<Image
								onClick={() => clickImg(false)}
								src={image2.img_url}
								alt={image2.img_name}
								fill
								style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
								className="shadow"
							/>
						</div>
						<br />
						<div
							className={`match-text mt-2 fs-5 fw-semibold ${
								selected === 'right' ? 'selected' : ''
							} ${selected === 'left' ? 'disappear' : ''}`}
						>
							{image2.img_name}
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}
