import { createContext, useContext, useState } from 'react';
import {
	checkCompareBarInLS,
	getCompareBarOpenFromLS,
	getComparisonFromLS,
} from '../helpers/localstorageCompare';

export const ComparisonContext = createContext();

export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(
		checkCompareBarInLS() ? getCompareBarOpenFromLS() : false
	);

	const [comparison, setComparison] = useState(getComparisonFromLS() || []);

	return (
		<ComparisonContext.Provider value={{ isOpen, setIsOpen, comparison, setComparison }}>
			{children}
		</ComparisonContext.Provider>
	);
};
