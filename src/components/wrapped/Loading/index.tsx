import { Spinner } from 'react-bootstrap';

export const Loading = () => {
	return (
		<div
			className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center bg-black opacity-50"
			style={{ zIndex: 1000 }}
		>
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
};
