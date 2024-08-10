import { useEffect } from 'react';
import { PROJECT_NAME } from '@features/catalogue/constants/catalogue';

export const useTitle = (title) => {
	useEffect(() => {
		if (title) {
			document.title = title === PROJECT_NAME ? title : `${title} | ${PROJECT_NAME}`;
		} else {
			document.title = PROJECT_NAME;
		}
	}, [title]);
};
