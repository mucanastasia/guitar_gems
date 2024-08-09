import { useHistory } from 'react-router-dom';
import logoBlack from '@assets/logo.png';
import logoWhite from '@assets/logo-white.png';
import { useTheme } from '@helpers/ThemeContext';
import './HeadingLogo.css';

export function HeadingLogo({ name, path }) {
	const history = useHistory();
	const { theme } = useTheme();

	const handleClick = () => {
		if (path) {
			history.push(path);
		}
	};

	return (
		<div className="heading-logo">
			<img
				src={theme === 'dark' ? logoWhite : logoBlack}
				className="heading-logo"
				alt="Guitar Gems logo image"
				onClick={handleClick}
			/>
			<h1 className="heading-logo">{name}</h1>
		</div>
	);
}
