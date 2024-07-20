import { Button } from 'react-aria-components';
import './styles/filtersSidebar.css';
import { useFilters } from './contexts/FiltersContext';

export default function FiltersSideBar({ setFilters, children }) {
	const { isOpen, setIsOpen } = useFilters();

	const handleFiltersClose = () => {
		setIsOpen((prev) => !prev);
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
			{isOpen && (
				<div className="filters-sidebar">
					<header className="filters-buttons">
						<Button onPress={handleFiltersApply}>Apply filters</Button>
						<Button onPress={handleFiltersClear}>Clear filters</Button>
						<span
							className="material-symbols-outlined"
							onClick={handleFiltersClose}>
							close
						</span>
					</header>
					{children}
				</div>
			)}
		</>
	);
}
