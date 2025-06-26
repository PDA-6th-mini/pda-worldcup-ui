import { Table as BootstrapTable } from 'react-bootstrap';

import { TableRow } from './TableRow';

interface Props {
	files: File[];
	onDelete: (file: File) => void;
}

const Table = ({ files, onDelete }: Props) => {
	return (
		<div
			style={{
				maxHeight: '100%',
				overflowY: 'auto',
				border: '1px solid #dee2e6',
				borderRadius: '0.375rem',
			}}
		>
			<BootstrapTable striped bordered hover style={{ marginBottom: 0 }}>
				<thead
					style={{
						position: 'sticky',
						top: 0,
						backgroundColor: 'white',
						zIndex: 1,
					}}
				>
					<tr>
						<th style={{ width: 'auto' }}>문제 이름</th>
						<th style={{ width: '200px' }}>사진</th>
						<th style={{ width: '50px' }}>삭제</th>
					</tr>
				</thead>
				<tbody>
					{files.map((file) => (
						<TableRow key={file.name} file={file} onDelete={onDelete} />
					))}
				</tbody>
			</BootstrapTable>
		</div>
	);
};

export default Table;
