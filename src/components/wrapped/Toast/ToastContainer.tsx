'use client';

import { ToastContainer as BootstrapToastContainer } from 'react-bootstrap';

interface Props {
	children: React.ReactNode;
}

export const ToastContainer = ({ children }: Props) => {
	return (
		<BootstrapToastContainer
			position="bottom-end"
			className="p-3"
			style={{ zIndex: 1050, position: 'fixed' }}
		>
			{children}
		</BootstrapToastContainer>
	);
};
