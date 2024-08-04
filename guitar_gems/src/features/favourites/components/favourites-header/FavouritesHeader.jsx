import { HeadingLogo } from '@ui/heading-logo';
import './FavouritesHeader.css';

export function FavouritesHeader({ name }) {
	return (
		<div className="favourites-header">
			<HeadingLogo name={name} />
		</div>
	);
}
