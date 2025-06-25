'use client';

import { ProblemCreateForm } from '@/components/ProblemCreateForm';
import Table from '@/components/Table';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const ProblemCreateClient = () => {
	const [files, setFiles] = useState<File[]>([]);

	const handleChangeFiles = (files: File[]) => {
		setFiles((prev) => [...prev, ...files]);
	};

	return (
		<div className="d-flex justify-content-center h-100">
			<Container fluid className="m-5 h-full">
				<Row className="m-2">
					<Col>
						<h1>이상형 월드컵 만들기</h1>
					</Col>
				</Row>
				<Row className="m-4 h-full">
					<Col md={6}>
						<ProblemCreateForm
							files={files}
							onChangeFiles={handleChangeFiles}
						/>
					</Col>
					<Col md={6}>
						<div className="border rounded p-3">
							<h2>문제 미리 보기</h2>
							<Table files={files} />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
