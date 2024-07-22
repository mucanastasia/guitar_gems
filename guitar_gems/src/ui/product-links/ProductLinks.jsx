import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import { Link } from 'react-router-dom';
import './ProductLinks.css';

export function ProductLinks({ brand, name, path }) {
	return (
		<Breadcrumbs>
			<Breadcrumb>
				<Link to={path}>Catalogue</Link>
			</Breadcrumb>
			<Breadcrumb>{`${brand} — ${name}`}</Breadcrumb>
		</Breadcrumbs>
	);
}
