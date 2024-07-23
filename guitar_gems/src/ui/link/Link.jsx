import { Link as RouterLink } from 'react-router-dom';
import { Button } from 'react-aria-components';
import { Icon } from '@ui/icon';
import './Link.css';

export function Link({ name, path = null, icon }) {
	if (!path) {
		return (
			<Button className="header-link">
				<Icon name={icon} color="white" />
				<p>{name}</p>
			</Button>
		);
	}

	return (
		<RouterLink to={path} className="header-link">
			<span className="material-symbols-outlined">{icon}</span>
			<p>{name}</p>
		</RouterLink>
	);
}
