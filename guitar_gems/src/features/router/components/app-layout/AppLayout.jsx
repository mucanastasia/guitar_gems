import { Header } from '@features/header';
import { Footer } from '@features/footer';

export function AppLayout({ children, shouldShowFooter, shouldShowHeader }) {
	return (
		<div className="app-layout">
			{shouldShowHeader && <Header />}

			<main>{children}</main>

			{shouldShowFooter && <Footer />}
		</div>
	);
}
