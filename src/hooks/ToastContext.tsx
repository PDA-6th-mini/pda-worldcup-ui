'use client';

import { createContext, useState } from 'react';

import { Toast } from '@/components/Toast';
import { ToastContainer } from '@/components/Toast/ToastContainer';
import { ToastType } from '@/types/toast';

interface ToastContextType {
	handleShowToast: (title: string, message: string, type?: ToastType) => void;
}

interface ToastContent {
	title: string;
	message: string;
	type?: ToastType;
}

const INITIAL_TOAST_CONTENT: ToastContent = {
	title: '',
	message: '',
	type: 'primary',
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [toastContent, setToastContent] = useState<ToastContent>(
		INITIAL_TOAST_CONTENT
	);
	const [showToast, setShowToast] = useState(false);

	const handleShowToast = (
		title: string,
		message: string,
		type?: ToastType
	) => {
		setShowToast(true);
		setToastContent({ title, message, type: type || 'primary' });
	};

	const handleCloseToast = () => {
		setShowToast(false);
		setToastContent(INITIAL_TOAST_CONTENT);
	};

	return (
		<ToastContext.Provider value={{ handleShowToast }}>
			{children}
			<ToastContainer>
				<Toast
					title={toastContent.title}
					message={toastContent.message}
					type={toastContent.type}
					showToast={showToast}
					onClose={handleCloseToast}
				/>
			</ToastContainer>
		</ToastContext.Provider>
	);
};
