import { createContext, useContext, useState } from 'react';

export const ComparisonContext = createContext();

export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(
		localStorage.getItem('comparison-Open')
			? JSON.parse(localStorage.getItem('comparison-Open'))
			: true
	);

	const [comparison, setComparison] = useState(
		JSON.parse(localStorage.getItem('comparison')) || []
	);

	return (
		<ComparisonContext.Provider value={{ isOpen, setIsOpen, comparison, setComparison }}>
			{children}
		</ComparisonContext.Provider>
	);
};
