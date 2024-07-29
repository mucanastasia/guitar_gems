import { useEffect } from 'react';
import { useInfiniteScroll } from '@features/catalogue/helpers/useInfiniteScroll';
import { GuitarList } from '../components/guitar-list';
import { useGuitars } from '../contexts/GuitarsContext';
import { NO_MATCH_TEXT } from '../constants/catalogue';
import { Text } from '@ui/text';

export function GuitarListContainer() {
	const { guitars, loading, hasMore, fetchGuitars, setHasMore } = useGuitars();

	useEffect(() => {
		setHasMore(true);
		fetchGuitars();
	}, []);

	const lastCardRef = useInfiniteScroll({ loading, hasMore, fetchGuitars });

	const props = {
		guitars,
		loading,
		lastCardRef,
	};

	if (!loading && (!guitars || guitars.length === 0)) {
		return (
			<div className="no-matches">
				<Text size="large">{NO_MATCH_TEXT.large}</Text>
				<Text size="xsmall">{NO_MATCH_TEXT.xsmall}</Text>
			</div>
		);
	}

	return <GuitarList {...props} />;
}
