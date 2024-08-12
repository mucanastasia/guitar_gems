import { useRef, useCallback } from 'react';

export const useInfiniteScroll = ({ isFetching, hasMore, fetchGuitars }) => {
	const observer = useRef();

	const lastCardRef = useCallback(
		(node) => {
			if (isFetching) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(async (entries) => {
				if (entries[0].isIntersecting && hasMore) {
					await new Promise((resolve) => setTimeout(resolve, 500));
					await fetchGuitars();
				}
			});

			if (node) observer.current.observe(node);
		},
		[isFetching, hasMore]
	);

	return lastCardRef;
};
