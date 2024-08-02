import { useSelectedFilters } from '@features/catalogue/contexts/SelectedFiltersContext';
import { useDrawerSwipe } from '@features/catalogue/helpers/useDrawerSwipe';
import { FiltersDrawer } from '@features/catalogue/components/filters-drawer';
import { useGuitars } from '../contexts/GuitarsContext';
import { useDrawer } from '../contexts/DrawerContext';

export function FiltersDrawerContainer({ children }) {
	const { initialFilters } = useSelectedFilters();
	const { isOpen, setIsOpen } = useDrawer();
	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useDrawerSwipe(setIsOpen);
	const { setFilters } = useGuitars();

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
