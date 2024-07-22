import { Link } from 'react-router-dom';
import logoWhite from '@assets/logo-white.png';
import './Logo.css';
import './HeaderLink.css';

export function Logo({ path }) {
	return (
		<Link to={path} className="header-link logo">
			<img src={logoWhite} className="logo" alt="Guitar Gems logo image" />
			<p>Guitar Gems</p>
		</Link>
	);
}
