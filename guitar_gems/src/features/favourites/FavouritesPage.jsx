import { useTitle } from '@helpers/useTitle';
import { FavouritesContainer } from '@features/favourites/containers/FavouritesContainer';

export function FavouritesPage() {
	useTitle('Favourites');

	return <FavouritesContainer />;
}
