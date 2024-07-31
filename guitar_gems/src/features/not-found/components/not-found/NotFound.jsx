import notFoundImg from '@assets/404.svg';
import { Link } from 'react-router-dom';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import './NotFound.css';

export function NotFound() {
	return (
		<div className="not-found-container">
			<img src={notFoundImg} alt="404 image" className="not-found-image" />
			<h1 className="not-found-text">Space jam gone wrong? </h1>
			<h1 className="not-found-text">{`Let's sync back to home.`}</h1>
			<Link to={ROOT_PATH} className="back-to-home-link">
				Back to home
			</Link>
		</div>
	);
}
