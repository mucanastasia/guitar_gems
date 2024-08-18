import { useTitle } from '@helpers/useTitle';
import { FavouritesHeader } from './components/favourites-header';
import { FavouritesContainer } from './containers/FavouritesContainer';
import { useUser } from '@api/useUser';
import { CompareBar } from '@features/comparison/components/compare-bar';

export function FavouritesPage() {
	const { data: user } = useUser();

	const userName = user?.user_metadata.name;

	useTitle(`${userName}'s picks`);

	return (
		<>
			<FavouritesHeader name={`${userName}'s picks`} />
			<FavouritesContainer />
			<CompareBar />
		</>
	);
}
