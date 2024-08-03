import { useFavourites } from '@api/useFavourites';
import { Spinner } from '@ui/spinner';
import { Favourites } from '../components/favourites';
import { useInfiniteScroll } from '@features/catalogue/helpers/useInfiniteScroll';

export function FavouritesContainer() {
	const {
		data,
		fetchNextPage: fetchGuitars,
		hasNextPage: hasMore,
		isFetching,
		isFetchingNextPage,
		isError,
	} = useFavourites();

	const favourites = data?.pages.flat() || [];

	const lastCardRef = useInfiniteScroll({ isFetching, hasMore, fetchGuitars });

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<Favourites
			favourites={favourites}
			isError={isError}
			isFetching={isFetching}
			isFetchingNextPage={isFetchingNextPage}
			lastCardRef={lastCardRef}
		/>
	);
}
