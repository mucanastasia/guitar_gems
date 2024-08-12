import { Breadcrumbs as AriaBreadcrumbs, Breadcrumb } from 'react-aria-components';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

export function Breadcrumbs({ brand, name, path }) {
	return (
		<AriaBreadcrumbs>
			<Breadcrumb>
				<Link to={path}>Catalogue</Link>
			</Breadcrumb>
			<Breadcrumb>{`${brand} — ${name}`}</Breadcrumb>
		</AriaBreadcrumbs>
	);
}
