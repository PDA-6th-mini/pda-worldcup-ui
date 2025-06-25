'use client';

import Image from 'next/image';

import { Container, Row, Col } from 'react-bootstrap';
import Denque from 'denque';
import { useRef, useEffect, useState } from 'react';
import { Img } from '@/types/api/img';

export default function MatchViewClient() {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [image1, setImage1] = useState<Img>();
	const [image2, setImage2] = useState<Img>();
	const [match, setMatch] = useState(0);
	const [round, setRound] = useState('16강');
	const [roundMatch, setRoundMatch] = useState(8);
	const queue = useRef(new Denque<Img>());

	useEffect(() => {
		// 이 부분에서 shuffle된 16개의  IMG를 setImageList한다.
		// const queue = new Denque<Img>();
		queue.current.push({
			img_id: 1,
			problem_id: 1,
			img_name: '1번 츄',
			img_url: '/images/chu1.jpeg',
		});
		queue.current.push({
			img_id: 2,
			problem_id: 1,
			img_name: '2번 츄',
			img_url: '/images/chu2.jpg',
		});
		queue.current.push({
			img_id: 3,
			problem_id: 1,
			img_name: '3번 츄',
			img_url: '/images/chu3.jpg',
		});
		queue.current.push({
			img_id: 4,
			problem_id: 1,
			img_name: '4번 츄',
			img_url: '/images/chu4.jpg',
		});
		queue.current.push({
			img_id: 5,
			problem_id: 1,
			img_name: '5번 츄',
			img_url: '/images/chu5.png',
		});
		queue.current.push({
			img_id: 6,
			problem_id: 1,
			img_name: '6번 츄',
			img_url: '/images/chu6.jpg',
		});
		queue.current.push({
			img_id: 7,
			problem_id: 1,
			img_name: '7번 츄',
			img_url: '/images/chu7.jfif',
		});
		queue.current.push({
			img_id: 8,
			problem_id: 1,
			img_name: '8번 츄',
			img_url: '/images/chu8.jpg',
		});
		queue.current.push({
			img_id: 9,
			problem_id: 1,
			img_name: '9번 츄',
			img_url: '/images/chu9.jpg',
		});
		queue.current.push({
			img_id: 10,
			problem_id: 1,
			img_name: '10번 츄',
			img_url: '/images/chu10.jpg',
		});
		queue.current.push({
			img_id: 11,
			problem_id: 1,
			img_name: '11번 츄',
			img_url: '/images/chu11.jpg',
		});
		queue.current.push({
			img_id: 12,
			problem_id: 1,
			img_name: '12번 츄',
			img_url: '/images/chu12.jpg',
		});
		queue.current.push({
			img_id: 13,
			problem_id: 1,
			img_name: '13번 츄',
			img_url: '/images/chu13.jpg',
		});
		queue.current.push({
			img_id: 14,
			problem_id: 1,
			img_name: '14번 츄',
			img_url: '/images/chu14.jpeg',
		});
		queue.current.push({
			img_id: 15,
			problem_id: 1,
			img_name: '15번 츄',
			img_url: '/images/chu15.jpg',
		});
		queue.current.push({
			img_id: 16,
			problem_id: 1,
			img_name: '16번 츄',
			img_url: '/images/chu16.png',
		});
		console.log('데이터 삽입 완료');
		setImage1(queue.current.shift());
		setImage2(queue.current.shift());
		console.log('라운드 ', match);
		console.log('시작 1번 이미지 =>', image1);
		console.log('시작 2번 이미지 =>', image2);
	}, []);

	useEffect(() => {
		if (match == 15) {
			//게임 종료!
			console.log('게임 종료! 우승자 => ', queue.current.shift());
		}
		if (match === 0) return;
		setImage1(queue.current.shift());
		setImage2(queue.current.shift());
		console.log('라운드 ', match);
		console.log('1번 이미지 =>', image1);
		console.log('2번 이미지 =>', image2);
		if (match === 14 || match === 12 || match === 8)
			setRoundMatch((prev) => prev / 2);
		if (match >= 14) setRound('결승');
		else if (match >= 12) setRound('4강');
		else if (match >= 8) setRound('8강');
	}, [match]);

	const clickImg = (rl: boolean) => {
		if (!image1 || !image2) return;
		if (rl) queue.current.push(image1);
		else queue.current.push(image2);
		setMatch((prev) => prev + 1);
	};

	if (!image1 || !image2) return null;

	return (
		<Container className="text-white text-center m-0">
			<h2 className="fs-4 fs-sm-3 fw-bold mb-4">
				{round}&nbsp;&nbsp;{(match % roundMatch) + 1}/{roundMatch}
			</h2>
			<Row className="align-items-center justify-content-center">
				<Col xs={5} className="d-flex flex-column align-items-center">
					<Image
						onClick={() => clickImg(true)}
						src={image1.img_url}
						alt={image1.img_name}
						width={450}
						height={550}
						className="img-fluid rounded shadow"
					/>
					<div className="mt-2 fs-5 fw-semibold">{image1.img_name}</div>
				</Col>
				<Col
					xs={1}
					className="d-flex justify-content-center align-items-center"
				>
					<span className="text-warning fs-2 fw-bold">VS</span>
				</Col>
				<Col xs={5} className="d-flex flex-column align-items-center">
					<Image
						onClick={() => clickImg(false)}
						src={image2.img_url}
						alt={image2.img_name}
						width={450}
						height={550}
						className="img-fluid rounded shadow img-fluid"
					/>
					<div className="mt-2 fs-5 fw-semibold">{image2.img_name}</div>
				</Col>
			</Row>
		</Container>
	);
}
