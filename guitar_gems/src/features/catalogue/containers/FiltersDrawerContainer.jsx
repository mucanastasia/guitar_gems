import { useSelectedFilters } from '../contexts/SelectedFiltersContext';
import { useDrawerSwipe } from '../helpers/useDrawerSwipe';
import { FiltersDrawer } from '../components/filters-drawer';
import { useDrawer } from '../contexts/DrawerContext';
import { useUrlState } from '../helpers/useUrlState';

export function FiltersDrawerContainer({ children }) {
	const { handleResetFilters, initialFilters } = useSelectedFilters();
	const { isOpen, setIsOpen } = useDrawer();
	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useDrawerSwipe(setIsOpen);
	const { updateURL } = useUrlState();

	const handleFiltersClose = () => {
		setIsOpen(false);
		handleResetFilters();
		updateURL(initialFilters);
	};

	const handleFiltersApply = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFiltersClear = () => {
		handleResetFilters();
		updateURL(initialFilters);
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
