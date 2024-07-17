import { useState, useEffect } from 'react';

export default function useWindowWidth() {
	const [isWidth1023, setIsWidth1023] = useState(window.innerWidth <= 1023);

	useEffect(() => {
		const handleResize = () => {
			setIsWidth1023(window.innerWidth <= 1023);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isWidth1023;
}
