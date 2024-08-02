import { useSelectedFilters } from '@features/catalogue/contexts/SelectedFiltersContext';
import { useDrawerSwipe } from '@features/catalogue/helpers/useDrawerSwipe';
import { FiltersDrawer } from '@features/catalogue/components/filters-drawer';
import { useDrawer } from '../contexts/DrawerContext';

export function FiltersDrawerContainer({ children }) {
	const { handleResetFilters } = useSelectedFilters();
	const { isOpen, setIsOpen } = useDrawer();
	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useDrawerSwipe(setIsOpen);

	const handleFiltersClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(false);
		handleResetFilters();
	};

	const handleFiltersApply = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFiltersClear = () => {
		handleResetFilters();
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
