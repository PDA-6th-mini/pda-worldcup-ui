'use client';

import { Button, Form } from 'react-bootstrap';
import { Dropzone } from '../Dropzone';
import { useCallback, useRef } from 'react';
import { useToast } from '@/hooks/useToast';
import { checkImageDuplicate } from '@/utils/image';

interface Props {
	files: File[];
	onChangeFiles: (files: File[]) => void;
}

export const ProblemCreateForm = ({ files, onChangeFiles }: Props) => {
	const { handleShowToast } = useToast();
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const handleFiles = useCallback(
		(filesInput: File[]) => {
			if (checkImageDuplicate([...files, ...filesInput])) {
				handleShowToast(
					'Duplicate Image',
					'중복된 이름의 이미지가 있습니다. 이름을 수정해주세요.',
					'danger'
				);
				return;
			}
			onChangeFiles(filesInput);
		},
		[files]
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!titleRef.current || !descriptionRef.current) {
			return;
		}

		if (!files) {
			handleShowToast('No File Selected', '파일을 선택해주세요.', 'danger');
			return;
		}

		// 월드컵은 16강만 지원, 이미지 무조건 16개가 필요함
		if (files.length !== 16) {
			handleShowToast(
				'Not Enough Images',
				'월드컵 생성에는 이미지 16개가 필요합니다.',
				'danger'
			);
			return;
		}

		const formData = new FormData();
		const title = titleRef.current.value;
		const description = descriptionRef.current.value;

		files.forEach((file) => {
			formData.append('files', file);
		});

		formData.append('title', title);
		formData.append('description', description);
	};

	return (
		<Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
			<Form.Group>
				<Form.Label htmlFor="title" className="text-lg">
					이상형 월드컵 이름
				</Form.Label>
				<Form.Control
					ref={titleRef}
					id="title"
					type="text"
					size="lg"
					placeholder="이상형 월드컵 이름을 입력해주세요. (최대 20자)"
					maxLength={20}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="description">이상형 월드컵 설명</Form.Label>
				<Form.Control
					ref={descriptionRef}
					id="description"
					as="textarea"
					size="lg"
					placeholder="이상형 월드컵 설명을 입력해주세요. (최대 100자)"
					maxLength={100}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Dropzone handleFiles={handleFiles} selectedFiles={files} />
			</Form.Group>
			<Button variant="primary" type="submit">
				다음
			</Button>
		</Form>
	);
};
