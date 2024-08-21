import { useFavourites } from '@api/useFavourites';
import { Favourites } from '../components/favourites';
import { useInfiniteScroll } from '@features/catalogue/helpers/useInfiniteScroll';
import { useDeleteFavourites } from '@api/useDeleteFavourites';
import { useScrollRestoration } from '@helpers/useScrollRestoration';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { useHistory, useLocation } from 'react-router-dom';

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

	const { saveScrollPosition } = useScrollRestoration();

	const history = useHistory();
	const location = useLocation();

	const handleGuitarClick = (guitarId) => {
		history.push({
			pathname: `${GUITAR_PATH_DIR}${guitarId}`,
			state: { from: location.pathname },
		});
		saveScrollPosition();
	};

	return (
		<Favourites
			favourites={favourites}
			isError={isError}
			isFetching={isFetching}
			isFetchingNextPage={isFetchingNextPage}
			lastCardRef={lastCardRef}
			deleteFavourites={deleteFavourites}
			handleGuitarClick={handleGuitarClick}
		/>
	);
}
