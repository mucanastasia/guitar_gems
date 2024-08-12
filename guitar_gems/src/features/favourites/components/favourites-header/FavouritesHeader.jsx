import { HeadingLogo } from '@ui/heading-logo';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import './FavouritesHeader.css';

export function FavouritesHeader({ name }) {
	return (
		<div className="favourites-header">
			<HeadingLogo name={name} path={ROOT_PATH} />
		</div>
	);
}
