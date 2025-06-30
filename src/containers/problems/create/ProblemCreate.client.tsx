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
		<div className="d-flex justify-content-center min-vh-100">
			<Container fluid className="py-4">
				<Row className="mb-4">
					<Col>
						<h1 className="text-center text-md-start p-4 pb-0">
							이상형 월드컵 만들기
						</h1>
					</Col>
				</Row>

				{/* 모바일에서는 세로 배치, 데스크탑에서는 좌우 배치 */}
				<Row className="g-4">
					{/* 폼 영역 */}
					<Col lg={6} className="order-2 order-lg-1">
						<div className="rounded shadow-sm p-4 h-100">
							<ProblemCreateForm
								files={files}
								onChangeFiles={handleChangeFiles}
								onSubmit={handleSubmit}
							/>
						</div>
					</Col>

					{/* 미리보기 영역 */}
					<Col lg={6} className="order-1 order-lg-2">
						<div className="rounded shadow-sm p-4 h-100">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h2 className="mb-0">문제 미리 보기</h2>
								<span className="badge bg-primary fs-6">{files.length}/16</span>
							</div>

							{/* 모바일에서는 간단한 카드 형태, 데스크탑에서는 테이블 */}
							<div
								className="d-none d-lg-block"
								style={{ maxHeight: '50vh', overflowY: 'auto' }}
							>
								<Table files={files} onDelete={handleDelete} />
							</div>

							{/* 모바일용 카드 형태 미리보기 */}
							<div className="d-lg-none">
								{files.length === 0 ? (
									<div className="text-center py-5">
										<p className="mb-0">업로드된 이미지가 없습니다</p>
										<small>이미지를 업로드하면 여기에 표시됩니다</small>
									</div>
								) : (
									<div
										className="row g-2"
										style={{ maxHeight: '400px', overflowY: 'auto' }}
									>
										{files.map((file) => (
											<div key={file.name} className="col-6">
												<div className="card h-100">
													<div
														className="card-img-top position-relative"
														style={{ height: '120px' }}
													>
														<img
															src={URL.createObjectURL(file)}
															alt={file.name}
															className="w-100 h-100"
															style={{ objectFit: 'cover' }}
														/>
														<button
															type="button"
															className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
															onClick={() => handleDelete(file)}
															style={{
																width: '24px',
																height: '24px',
																padding: 0,
																fontSize: '12px',
															}}
														>
															×
														</button>
													</div>
													<div className="card-body p-2">
														<p
															className="card-text small mb-0 text-truncate"
															title={file.name}
														>
															{file.name}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
