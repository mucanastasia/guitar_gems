import { useQueryClient } from '@tanstack/react-query';

export const useScrollRestoration = () => {
	const queryClient = useQueryClient();

	const saveScrollPosition = () => {
		const currentPosition = window.scrollY;
		queryClient.setQueryData(['scroll-position'], currentPosition);
	};

	const restoreScrollPosition = () => {
		const savedPosition = queryClient.getQueryData(['scroll-position']);
		if (savedPosition !== undefined) {
			setTimeout(() => {
				window.scrollTo(0, savedPosition);
			}, 5);
		}
	};

	return { saveScrollPosition, restoreScrollPosition };
};
