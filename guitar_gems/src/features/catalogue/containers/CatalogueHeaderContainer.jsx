import { useState, useEffect, useRef } from 'react';
import { useWindowWidth } from '@helpers/useWindowWidth';
import { useSelectedFilters } from '../contexts/SelectedFiltersContext';
import { CatalogueHeader } from '../components/catalogue-header';
import { useDrawer } from '../contexts/DrawerContext';
import { useUrlState } from '../helpers/useUrlState';

export function CatalogueHeaderContainer() {
	const { selectedFilters, setSelectedFilters } = useSelectedFilters();
	const { updateURL } = useUrlState();
	const { setIsOpen } = useDrawer();

	const isMobile = useWindowWidth();
	const searchRef = useRef();
	const [query, setQuery] = useState('');

	//TODO: Is it better to implement Instant search or as it is now?

	useEffect(() => {
		if (selectedFilters.query) {
			setQuery(selectedFilters.query);
		}
	}, [selectedFilters.query]);

	const handleSubmit = () => {
		const value = searchRef.current.value.trim();
		const newFilters = { ...selectedFilters, query: value };
		setSelectedFilters(newFilters);
		updateURL(newFilters);
	};

	const handleClearOrEscape = (e) => {
		if (e && e.key !== 'Escape') {
			return;
		}
		if (selectedFilters.query) {
			const newFilters = { ...selectedFilters, query: '' };
			setSelectedFilters(newFilters);
			updateURL(newFilters);
		}
	};

	const handleFiltersClick = () => {
		setIsOpen((prev) => !prev);
	};

	const props = {
		isMobile,
		searchRef,
		handleSubmit,
		handleClearOrEscape,
		handleFiltersClick,
		query,
		setQuery,
	};

	return <CatalogueHeader {...props} />;
}
