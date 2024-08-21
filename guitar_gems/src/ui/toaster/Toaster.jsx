import { Toaster as HotToaster, ToastBar, toast } from 'react-hot-toast';
import { IconButton } from '@ui/icon';
import './Toaster.css';

export function Toaster() {
	return (
		<HotToaster
			position="top-center"
			toastOptions={{
				className: 'toast-container',
				success: {
					duration: 2500,
				},
				error: {
					duration: 5000,
				},
			}}>
			{(t) => (
				<ToastBar
					toast={t}
					style={{
						color: 'var(--primary-color)',
						boxShadow: 'var(--box-shadow)',
						borderRadius: '4px',
						background: 'var(--background-color)',
						...t.style,
					}}>
					{({ icon, message }) => (
						<>
							{icon}
							{message}
							{t.type !== 'loading' && (
								<IconButton
									onClick={() => toast.dismiss(t.id)}
									name="close"
									size="small"
								/>
							)}
						</>
					)}
				</ToastBar>
			)}
		</HotToaster>
	);
}
