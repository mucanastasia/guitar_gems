import { useTitle } from '@helpers/useTitle';
import { NotFound } from './components/not-found';

export function NotFoundPage() {
	useTitle('404 Not Found');

	return <NotFound />;
}
