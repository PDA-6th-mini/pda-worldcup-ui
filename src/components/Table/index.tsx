import { Table as BootstrapTable } from 'react-bootstrap';
import { TableRow } from './TableRow';

interface Props {
	files: File[];
	onDelete: (file: File) => void;
}

export const Table = ({ files, onDelete }: Props) => {
	return (
		<BootstrapTable striped bordered hover>
			<thead>
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
	);
};

export default Table;
