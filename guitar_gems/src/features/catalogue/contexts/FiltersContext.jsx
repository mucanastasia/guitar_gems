import { createContext, useContext, useState } from 'react';

export const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
	const initialFilters = {
		brands: [],
		types: [],
		materials: [],
		countries: [],
		date: { start: null, end: null },
		query: '',
	};

	const [selectedFilters, setSelectedFilters] = useState(initialFilters);

	const [isOpen, setIsOpen] = useState(false);

	return (
		<FiltersContext.Provider
			value={{ selectedFilters, setSelectedFilters, isOpen, setIsOpen, initialFilters }}>
			{children}
		</FiltersContext.Provider>
	);
};
