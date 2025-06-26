'use client';

import { FC, useCallback } from 'react';

import { useDropzone } from 'react-dropzone';

interface Props {
	handleFiles: (files: File[]) => void;
}

export const Dropzone: FC<Props> = ({ handleFiles }) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			handleFiles(acceptedFiles);
		},
		[handleFiles]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
		},
	});

	return (
		<div
			{...getRootProps()}
			className="p-5 rounded text-center border border-dashed"
		>
			<input {...getInputProps()} multiple />
			{isDragActive ? (
				<p>여기에 파일을 드롭해주세요.</p>
			) : (
				<p>문제로 만들 이미지 파일을 드롭 하거나 클릭하여 선택하세요.</p>
			)}
		</div>
	);
};
