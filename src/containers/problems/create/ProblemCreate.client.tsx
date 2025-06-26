'use client';

import { useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { ProblemCreateForm } from '@/components/ProblemCreateForm';
import Table from '@/components/Table';
import createProblem from '@/services/problem';

export const ProblemCreateClient = () => {
	const [files, setFiles] = useState<File[]>([]);

	const handleChangeFiles = (files: File[]) => {
		setFiles((prev) => [...prev, ...files]);
	};

	const handleDelete = (file: File) => {
		setFiles((prev) => prev.filter((f) => f.name !== file.name));
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
							fetchProblem={createProblem}
						/>
					</Col>
					<Col md={6}>
						<div className="border rounded p-3">
							<h2>문제 미리 보기</h2>
							<Table files={files} onDelete={handleDelete} />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
