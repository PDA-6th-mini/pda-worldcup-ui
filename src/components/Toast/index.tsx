'use client';

import { ToastType } from '@/types/toast';
import { Toast as BootstrapToast } from 'react-bootstrap';

interface Props {
	title: string;
	message: string;
	showToast: boolean;
	type?: ToastType;
	onClose: () => void;
}

export const Toast = ({
	title,
	message,
	showToast,
	type = 'primary',
	onClose,
}: Props) => {
	return (
		<BootstrapToast
			show={showToast}
			autohide
			delay={3000}
			bg={type}
			onClose={onClose}
		>
			<BootstrapToast.Header>
				<strong className="me-auto">{title}</strong>
			</BootstrapToast.Header>
			<BootstrapToast.Body>{message}</BootstrapToast.Body>
		</BootstrapToast>
	);
};
