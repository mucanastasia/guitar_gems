import notFoundImg from '../../assets/404.svg';
import { Link } from 'react-router-dom';
import './styles/notFoundPage.css';

export default function NotFoundPage() {
	return (
		<div className="not-found-container">
			<img
				src={notFoundImg}
				alt="404 image"
				className="not-found-image"
			/>
			<h1 className="not-found-text">Space jam gone wrong? </h1>
			<h1 className="not-found-text">{`Let's sync back to home.`}</h1>
			<Link
				to="/"
				className="back-to-home-link">
				Back to home
			</Link>
		</div>
	);
}
