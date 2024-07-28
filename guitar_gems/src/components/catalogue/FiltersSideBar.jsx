import { Button } from 'react-aria-components';
import './styles/filtersSidebar.css';
import { useFilters } from '@features/catalogue/contexts/FiltersContext';
import { useDrawerSwipe } from '@features/catalogue/helpers/useDrawerSwipe';

export default function FiltersSideBar({ setFilters, children }) {
	const { isOpen, setIsOpen } = useFilters();
	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useDrawerSwipe(setIsOpen);

	const handleFiltersClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(false);
		setFilters({
			brands: [],
			types: [],
			materials: [],
			countries: [],
			date: { start: null, end: null },
			query: '',
		});
	};

	const handleFiltersApply = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFiltersClear = () => {
		setFilters({
			brands: [],
			types: [],
			materials: [],
			countries: [],
			date: { start: null, end: null },
			query: '',
		});
	};

	return (
		<>
			<div
				className={`filters-drawer ${isOpen && 'open'}`}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}>
				<header className="filters-buttons">
					<Button onPress={handleFiltersApply}>Apply filters</Button>
					<Button onPress={handleFiltersClear}>Clear filters</Button>
					<span className="material-symbols-outlined" onClick={handleFiltersClose}>
						close
					</span>
				</header>
				{children}
			</div>
		</>
	);
}
