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

	const handleResetFilters = () => {
		setSelectedFilters(initialFilters);
	};

	return (
		<SelectedFiltersContext.Provider
			value={{
				selectedFilters,
				setSelectedFilters,
				handleResetFilters,
			}}>
			{children}
		</SelectedFiltersContext.Provider>
	);
};
