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

	// const { comparison, setComparison } = useComparison();

	// const findGuitarInCompare = useCallback(
	// 	(id) => {
	// 		return comparison.find((guitar) => guitar.id === id) !== undefined;
	// 	},
	// 	[comparison]
	// );

	// const addToCompare = (id, name) => {
	// 	if (comparison.length >= 3) {
	// 		return;
	// 	} else {
	// 		const newComparison = [...comparison, { id, name }];
	// 		setComparison(newComparison);
	// 		setComparisonToLS(newComparison);
	// 	}
	// };

	// const removeFromCompare = (id) => {
	// 	const newComparison = comparison.filter((guitar) => guitar.id !== id);
	// 	setComparison(newComparison);
	// 	setComparisonToLS(newComparison);
	// };

	// const CompareActionContainer = ({ id, name }) => {
	// 	return (
	// 		<TooltipTrigger>
	// 			<IconButton
	// 				name="compare"
	// 				size="medium"
	// 				className={`material-symbols-outlined ${
	// 					findGuitarInCompare(id) || comparison.length === 3 ? 'none' : 'outlined'
	// 				}`}
	// 				onClick={() => {
	// 					findGuitarInCompare(id) ? removeFromCompare(id) : addToCompare(id, name);
	// 				}}
	// 				preventDefault
	// 			/>
	// 			<Tooltip>{`${
	// 				findGuitarInCompare(id) ? 'Delete from' : 'Add for'
	// 			} comparison`}</Tooltip>
	// 		</TooltipTrigger>
	// 	);
	// };

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
