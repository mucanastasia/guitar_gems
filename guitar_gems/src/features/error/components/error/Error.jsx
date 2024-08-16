import { ROOT_PATH } from '@features/router/constants/routePaths';
import '../not-found/NotFound.css';

export function Error() {
	return (
		<div className="error-container">
			<h1 className="error-text">OOPS! </h1>
			<h1 className="error-text">Something went wrong </h1>
			<a href={ROOT_PATH} className="back-to-home-link">
				Back to home
			</a>
		</div>
	);
}
