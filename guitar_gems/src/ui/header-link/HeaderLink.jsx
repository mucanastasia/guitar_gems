import { Link } from 'react-router-dom';
import { Button } from 'react-aria-components';

export function HeaderLink({ name, path = null, icon }) {
	if (!path) {
		return (
			<Button className="header-link">
				<span className="material-symbols-outlined">{icon}</span>
				<p>{name}</p>
			</Button>
		);
	}

	return (
		<Link to={path} className="header-link">
			<span className="material-symbols-outlined">{icon}</span>
			<p>{name}</p>
		</Link>
	);
}
