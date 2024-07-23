import { Link as RouterLink } from 'react-router-dom';
import logoWhite from '@assets/logo-white.png';
import './Logo.css';
import './Link.css';

export function Logo({ path }) {
	return (
		<RouterLink to={path} className="header-link logo">
			<img src={logoWhite} className="logo" alt="Guitar Gems logo image" />
			<p>Guitar Gems</p>
		</RouterLink>
	);
}
