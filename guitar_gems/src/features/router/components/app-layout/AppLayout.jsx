import { Header } from '@features/header';
import { Footer } from '@features/footer';
import './AppLayout.css';

export function AppLayout({ children, shouldShowFooter, shouldShowHeader }) {
	return (
		<div className="app-layout">
			{shouldShowHeader && <Header />}

			<main className="main-content">{children}</main>

			{shouldShowFooter && <Footer />}
		</div>
	);
}
