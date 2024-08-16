import { useTitle } from '@helpers/useTitle';
import { Error } from './components/error';

export function ErrorPage() {
	useTitle('OOPS!');

	return <Error />;
}
