import { useTitle } from '@helpers/useTitle';
import { FavouritesContainer } from '@features/favourites/containers/FavouritesContainer';

export function FavouritesPage() {
	useTitle('My Picks');

	return <FavouritesContainer />;
}
