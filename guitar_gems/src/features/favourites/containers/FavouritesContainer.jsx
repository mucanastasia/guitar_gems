import { useFavourites } from '@api/useFavourites';
import { Favourites } from '../components/favourites';
import { useInfiniteScroll } from '@features/catalogue/helpers/useInfiniteScroll';
import { useDeleteFavourites } from '@api/useDeleteFavourites';

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

	const { mutate: deleteFavourites } = useDeleteFavourites();

	return (
		<Favourites
			favourites={favourites}
			isError={isError}
			isFetching={isFetching}
			isFetchingNextPage={isFetchingNextPage}
			lastCardRef={lastCardRef}
			deleteFavourites={deleteFavourites}
		/>
	);
}
