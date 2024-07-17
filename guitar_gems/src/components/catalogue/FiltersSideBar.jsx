import { Button } from 'react-aria-components';
import './styles/filtersSidebar.css';

export default function FiltersSideBar({
	isOpen,
	setIsOpen,
	setSelected,
	children,
}) {
	const handleFiltersClose = () => {
		setIsOpen((prev) => !prev);
		setSelected({
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
		setSelected({
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
