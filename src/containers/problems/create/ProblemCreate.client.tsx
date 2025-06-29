'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { Col, Container, Row } from 'react-bootstrap';

import { revalidatePageByPath } from '@/actions/revalidate';
import { ProblemCreateForm } from '@/components/pages/ProblemCreateForm';
import { Loading } from '@/components/wrapped/Loading';
import Table from '@/components/wrapped/Table';
import { useToast } from '@/hooks/useToast';
import { createProblem } from '@/services/problem';

export const ProblemCreateClient = () => {
	const router = useRouter();
	const { handleShowToast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: createProblem,
		onSuccess: async (data) => {
			if (data.status === 200) {
				try {
					await revalidatePageByPath('/');
				} catch (error) {
					console.error('캐시 무효화 실패:', error);
				}
				handleShowToast('Success', '문제가 생성되었습니다.', 'success');
				router.replace('/');
			}
		},
		onError: () => {
			handleShowToast('Error', '문제 생성에 실패하였습니다.', 'danger');
		},
	});
	const [files, setFiles] = useState<File[]>([]);

	const handleChangeFiles = (files: File[]) => {
		setFiles((prev) => [...prev, ...files]);
	};

	const handleDelete = (file: File) => {
		setFiles((prev) => prev.filter((f) => f.name !== file.name));
	};

	const handleSubmit = (formData: FormData) => {
		mutate(formData);
	};

	if (isPending) {
		return <Loading />;
	}

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
							onSubmit={handleSubmit}
						/>
					</Col>
					<Col md={6}>
						<div className="border rounded p-3">
							<h2>문제 미리 보기 ({files.length})</h2>
							<Table files={files} onDelete={handleDelete} />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
