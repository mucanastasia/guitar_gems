import { createContext, useContext, useState } from 'react';

export const SelectedFiltersContext = createContext();

export const useSelectedFilters = () => useContext(SelectedFiltersContext);

export const SelectedFiltersProvider = ({ children }) => {
	const initialFilters = {
		brands: [],
		types: [],
		materials: [],
		countries: [],
		date: { start: null, end: null },
		query: '',
	};

	const [selectedFilters, setSelectedFilters] = useState(initialFilters);

	return (
		<SelectedFiltersContext.Provider
			value={{ selectedFilters, setSelectedFilters, initialFilters }}>
			{children}
		</SelectedFiltersContext.Provider>
	);
};
