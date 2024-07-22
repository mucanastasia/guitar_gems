import { useRef } from 'react';
import { Button, Input, SearchField } from 'react-aria-components';
// import logo from '@assets/logo.png';
import './styles/catalogueHeader.css';
import useWindowWidth from './hooks/useWindowWidth';
import { useFilters } from './contexts/FiltersContext';
import { HeadingLogo } from '@ui/heading-logo';

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
					{isMobile ? (
						<div className="filters-label" onClick={handleFiltersClick}>
							<span className="material-symbols-outlined">tune</span>
							<p>Filters</p>
						</div>
					) : (
						<div className="filters-label">
							<span className="material-symbols-outlined">tune</span>
							<p>Filters</p>
						</div>
					)}
					<SearchField
						aria-label="Search"
						onSubmit={handleSubmit}
						onClear={handleClearOrEscape}
						onKeyDown={handleClearOrEscape}>
						<span className="material-symbols-outlined" onClick={handleSubmit}>
							search
						</span>
						<Input aria-label="Search" placeholder="Search" ref={searchRef} type="text" />
						<Button className="react-aria-Button material-symbols-outlined">
							close_small
						</Button>
					</SearchField>
				</div>
			</div>
		</div>
	);
}
