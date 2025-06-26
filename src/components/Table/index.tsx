import { Table as BootstrapTable } from 'react-bootstrap';
import Image from 'next/image';

interface Props {
	files: File[];
}

export const Table = ({ files }: Props) => {
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
						<td style={{ width: '24px', textAlign: 'center' }}>x</td>
					</tr>
				))}
			</tbody>
		</BootstrapTable>
	);
};

export default Table;
