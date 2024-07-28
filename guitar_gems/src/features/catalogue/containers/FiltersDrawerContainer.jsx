import { useFilters } from '@features/catalogue/contexts/FiltersContext';
import { useDrawerSwipe } from '@features/catalogue/helpers/useDrawerSwipe';
import { FiltersDrawer } from '@features/catalogue/components/filters-drawer';

export function FiltersDrawerContainer({ setFilters, children }) {
	const { isOpen, setIsOpen, initialFilters } = useFilters();
	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useDrawerSwipe(setIsOpen);

	const handleFiltersClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(false);
		setFilters(initialFilters);
	};

	const handleFiltersApply = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFiltersClear = () => {
		setFilters(initialFilters);
	};

	const props = {
		isOpen,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleFiltersClose,
		handleFiltersApply,
		handleFiltersClear,
	};

	return <FiltersDrawer {...props}>{children}</FiltersDrawer>;
}