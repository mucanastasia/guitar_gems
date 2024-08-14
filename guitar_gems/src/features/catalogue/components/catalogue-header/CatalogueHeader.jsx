import { Label } from '@ui/label';
import { HeadingLogo } from '@ui/heading-logo';
import { Icon } from '@ui/icon';
import { SearchField } from '@ui/search-field';
import { PROJECT_NAME } from '../../constants/catalogue';
import './CatalogueHeader.css';

export function CatalogueHeader({ ...props }) {
	const {
		isMobile,
		searchRef,
		handleSubmit,
		handleClearOrEscape,
		handleFiltersClick,
		query,
		setQuery,
	} = props;

	return (
		<div className="catalogue-page-header">
			<div className="logo">
				<HeadingLogo name={PROJECT_NAME} />
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
						value={query}
						onChange={setQuery}
						onSubmit={handleSubmit}
						onClear={handleClearOrEscape}
						searchRef={searchRef}
					/>
				</div>
			</div>
		</div>
	);
}
