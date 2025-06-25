import { ToastProvider } from '@/hooks/ToastContext';
import { ProblemCreateClient } from './ProblemCreate.client';

export const ProblemCreateContainer = () => {
	return (
		<ToastProvider>
			<ProblemCreateClient />
		</ToastProvider>
	);
};
