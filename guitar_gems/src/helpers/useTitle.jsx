import { useEffect } from 'react';
import { PROJECT_NAME } from '@features/catalogue/constants/catalogue';

export const useTitle = (title) => {
	useEffect(() => {
		document.title = title === PROJECT_NAME ? title : `${title} | ${PROJECT_NAME}`;
	}, [title]);
};
