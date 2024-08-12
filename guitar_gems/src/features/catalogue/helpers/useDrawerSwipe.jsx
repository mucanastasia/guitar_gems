import { useRef } from 'react';

export function useDrawerSwipe(setIsOpen) {
	const touchStartX = useRef(0);
	const touchEndX = useRef(0);

	const handleTouchStart = (e) => {
		touchStartX.current = e.targetTouches[0].clientX;
	};

	const handleTouchMove = (e) => {
		touchEndX.current = e.targetTouches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (touchStartX.current - touchEndX.current > 100) {
			setIsOpen(false);
		}
	};

	return { handleTouchStart, handleTouchMove, handleTouchEnd };
}
