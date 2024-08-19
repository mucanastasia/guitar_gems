import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useHistory, useLocation } from 'react-router-dom';

export const useScrollRestoration = () => {
	const queryClient = useQueryClient();

	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		const unlisten = history.listen((_location, action) => {
			if (action === 'POP') {
				restoreScrollPosition();
			}
		});

		return () => {
			unlisten();
		};
	}, [history]);

	const saveScrollPosition = () => {
		const currentPosition = window.scrollY;
		queryClient.setQueryData(['scroll-position', location.pathname], currentPosition);
	};

	const restoreScrollPosition = () => {
		const path = location.state?.from;
		const savedPosition = queryClient.getQueryData(['scroll-position', path]);
		if (savedPosition !== undefined) {
			setTimeout(() => {
				window.scrollTo(0, savedPosition);
			}, 5);
		}
	};

	return { saveScrollPosition, restoreScrollPosition };
};
