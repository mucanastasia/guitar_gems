import { useRef } from 'react';
import { Label } from '@ui/label';
import './styles/catalogueHeader.css';
import useWindowWidth from './hooks/useWindowWidth';
import { useFilters } from './contexts/FiltersContext';
import { HeadingLogo } from '@ui/heading-logo';
import { Icon } from '../../ui/icon';
import { SearchField } from '@ui/search-field';

export default function CatalogueHeader({ setFilters }) {
	const { selectedFilters, setIsOpen } = useFilters();
	const isMobile = useWindowWidth();
	const searchRef = useRef();

	const handleSubmit = () => {
		const value = searchRef.current.value.trim();
		setFilters({ ...selectedFilters, query: value });
	};

	const handleClearOrEscape = (e) => {
		if (e && e.key !== 'Escape') {
			return;
		}
		if (selectedFilters.query) {
			setFilters({ ...selectedFilters, query: '' });
		}
	};

	const handleFiltersClick = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="catalogue-page-header">
			<div className="logo">
				<HeadingLogo name="Guitar Gems" path="/" />
			</div>
			<div className="catalogue-header">
				<div className="wrap">
					<div
						className="filters-label"
						onClick={isMobile ? handleFiltersClick : undefined}>
						<Icon name="tune" />
						<Label>Filters</Label>
					</div>
					<SearchField
						onSubmit={handleSubmit}
						onClear={handleClearOrEscape}
						searchRef={searchRef}
					/>
				</div>
			</div>
		</div>
	);
}
