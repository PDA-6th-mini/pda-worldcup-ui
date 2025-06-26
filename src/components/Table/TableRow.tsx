'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Trash } from 'lucide-react';

interface Props {
	file: File;
	onDelete: (file: File) => void;
}

export const TableRow: FC<Props> = ({ file, onDelete }) => {
	return (
		<tr key={file.name}>
			<td>{file.name.split('.')[0]}</td>
			<td>
				<Image
					src={URL.createObjectURL(file)}
					alt={file.name}
					width={200}
					height={260}
				/>
			</td>
			<td style={{ width: '24px', textAlign: 'center' }}>
				<Trash cursor="pointer" onClick={() => onDelete(file)} />
			</td>
		</tr>
	);
};
