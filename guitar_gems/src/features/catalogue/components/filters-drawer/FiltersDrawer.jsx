import { Button } from 'react-aria-components';
import './FiltersDrawer.css';

export function FiltersDrawer({ children, ...props }) {
	const {
		isOpen,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleFiltersClose,
		handleFiltersApply,
		handleFiltersClear,
	} = props;

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
