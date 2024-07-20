import { useState, useEffect } from 'react';

export default function useWindowWidth() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1023);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile;
}
