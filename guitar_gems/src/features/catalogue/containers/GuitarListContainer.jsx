import { useInfiniteScroll } from '@features/catalogue/helpers/useInfiniteScroll';
import { GuitarList } from '../components/guitar-list';
import { NO_MATCH_TEXT } from '../constants/catalogue';
import { Text } from '@ui/text';
import { useGuitars } from '@api/useGuitars';
import { useSelectedFilters } from '@features/catalogue/contexts/SelectedFiltersContext';

export function GuitarListContainer() {
	const { selectedFilters } = useSelectedFilters();

	const {
		data,
		fetchNextPage: fetchGuitars,
		hasNextPage: hasMore,
		isFetching,
		isFetchingNextPage,
	} = useGuitars(selectedFilters);

	const guitars = data?.pages.flat() || [];

	const lastCardRef = useInfiniteScroll({ isFetching, hasMore, fetchGuitars });

	const props = {
		guitars,
		isFetching,
		isFetchingNextPage,
		lastCardRef,
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
