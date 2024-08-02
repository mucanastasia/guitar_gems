import { useRef } from 'react';
import { useWindowWidth } from '@helpers/useWindowWidth';
import { useSelectedFilters } from '../contexts/SelectedFiltersContext';
import { CatalogueHeader } from '../components/catalogue-header';
import { useDrawer } from '../contexts/DrawerContext';

export function CatalogueHeaderContainer() {
	const { selectedFilters, setSelectedFilters } = useSelectedFilters();
	const { setIsOpen } = useDrawer();

	const isMobile = useWindowWidth();
	const searchRef = useRef();

	const handleSubmit = () => {
		const value = searchRef.current.value.trim();
		setSelectedFilters({ ...selectedFilters, query: value });
	};

	const handleClearOrEscape = (e) => {
		if (e && e.key !== 'Escape') {
			return;
		}
		if (selectedFilters.query) {
			setSelectedFilters({ ...selectedFilters, query: '' });
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
	};

	return <CatalogueHeader {...props} />;
}
