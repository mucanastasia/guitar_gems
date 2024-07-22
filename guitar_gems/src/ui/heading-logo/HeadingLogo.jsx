import { useHistory } from 'react-router-dom';
import logoBlack from '@assets/logo.png';
import logoWhite from '@assets/logo-white.png';
import './HeadingLogo.css';

export function HeadingLogo({ name, path, theme = 'light' }) {
	const history = useHistory();

	const handleClick = () => {
		if (path) {
			history.push(path);
		}
	};

	return (
		<div className="heading-logo">
			<img
				src={theme === 'light' ? logoBlack : logoWhite}
				className="heading-logo"
				alt="Guitar Gems logo image"
				onClick={handleClick}
			/>
			<h1 className={`heading-logo ${theme}`}>{name}</h1>
		</div>
	);
}
