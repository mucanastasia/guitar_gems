import { useRef, useCallback } from 'react';

export const useInfiniteScroll = ({ loading, hasMore, fetchData }) => {
	const observer = useRef();

	const lastCardRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(async (entries) => {
				if (entries[0].isIntersecting && hasMore) {
					await fetchData();
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	return lastCardRef;
};
