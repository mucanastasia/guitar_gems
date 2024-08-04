import { useInfiniteScroll } from '@features/catalogue/helpers/useInfiniteScroll';
import { GuitarList } from '../components/guitar-list';
import { NO_MATCH_TEXT } from '../constants/catalogue';
import { Text } from '@ui/text';
import { useGuitars } from '@api/useGuitars';
import { useAddFavourites } from '@api/useAddFavourites';
import { useDeleteFavourites } from '@api/useDeleteFavourites';
import { useSelectedFilters } from '@features/catalogue/contexts/SelectedFiltersContext';
import { useHistory } from 'react-router-dom';
import { useUser } from '@api/useUser';
import { SIGN_IN_PATH } from '@features/router/constants/routePaths';

export function GuitarListContainer() {
	const { selectedFilters } = useSelectedFilters();
	const history = useHistory();
	const { data: user } = useUser();
	const isAnonym = user === null;

	const {
		data,
		fetchNextPage: fetchGuitars,
		hasNextPage: hasMore,
		isFetching,
		isFetchingNextPage,
	} = useGuitars(selectedFilters);

	const guitars = data?.pages.flat() || [];

	const lastCardRef = useInfiniteScroll({ isFetching, hasMore, fetchGuitars });

	const { mutate: addFavourites } = useAddFavourites();
	const { mutate: deleteFavourites } = useDeleteFavourites();

	const handleFavourites = (guitar) => {
		if (isAnonym) {
			history.push(SIGN_IN_PATH);
			return;
		}
		return guitar.is_favourite
			? deleteFavourites({ guitarId: guitar.id })
			: addFavourites({ guitarId: guitar.id });
	};

	const props = {
		guitars,
		isFetching,
		isFetchingNextPage,
		lastCardRef,
		handleFavourites,
	};

	if (!isFetching && (!guitars || guitars.length === 0)) {
		return (
			<div className="no-matches">
				<Text size="large">{NO_MATCH_TEXT.large}</Text>
				<Text size="xsmall">{NO_MATCH_TEXT.xsmall}</Text>
			</div>
		);
	}

	return <GuitarList {...props} />;
}
