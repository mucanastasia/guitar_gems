import { useFavourites } from '@api/useFavourites';
import { Favourites } from '../components/favourites';
import { useInfiniteScroll } from '@features/catalogue/helpers/useInfiniteScroll';
import { useDeleteFavourites } from '@api/useDeleteFavourites';
import { IconButton } from '@ui/icon';
import { Tooltip } from '@ui/tooltip';
import { TooltipTrigger } from 'react-aria-components';
import { useComparison } from '@features/comparison/contexts/ComparisonContext';

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

	///// comparison feature
	// TODO: Store only ids in localStorage and get name from the API (there is might be an error when changing the name of the guitar).

	const { comparison, setComparison } = useComparison();

	const findGuitarInComparison = (id) => {
		return comparison.find((guitar) => guitar.id === id) !== undefined;
	};

	const handleAddForComparison = (id, name) => {
		if (comparison.length >= 3) {
			return;
		} else {
			const newComparison = [...comparison, { id, name }];
			setComparison(newComparison);
			localStorage.setItem('comparison', JSON.stringify(newComparison));
		}
	};

	const handleDeleteFromComparison = (id) => {
		const newComparison = comparison.filter((guitar) => guitar.id !== id);
		setComparison(newComparison);
		localStorage.setItem('comparison', JSON.stringify(newComparison));
	};

	const ComparisonAction = ({ id, name }) => {
		return (
			<TooltipTrigger>
				<IconButton
					name="compare"
					size="medium"
					className={`material-symbols-outlined ${
						findGuitarInComparison(id) || comparison.length === 3 ? 'none' : 'outlined'
					}`}
					onClick={() => {
						findGuitarInComparison(id)
							? handleDeleteFromComparison(id)
							: handleAddForComparison(id, name);
					}}
					preventDefault
				/>
				<Tooltip>{`${
					findGuitarInComparison(id) ? 'Delete from' : 'Add for'
				} comparison`}</Tooltip>
			</TooltipTrigger>
		);
	};

	return (
		<Favourites
			favourites={favourites}
			isError={isError}
			isFetching={isFetching}
			isFetchingNextPage={isFetchingNextPage}
			lastCardRef={lastCardRef}
			deleteFavourites={deleteFavourites}
			EditorActions={ComparisonAction}
		/>
	);
}
