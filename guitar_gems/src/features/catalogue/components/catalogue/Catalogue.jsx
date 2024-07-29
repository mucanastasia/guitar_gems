import { FiltersDrawerContainer } from '../../containers/FiltersDrawerContainer';
import { FiltersSidebarContainer } from '../../containers/FiltersSidebarContainer';
import { CatalogueHeaderContainer } from '../../containers/CatalogueHeaderContainer';
import { GuitarListContainer } from '../../containers/GuitarListContainer';
import './Catalogue.css';

export function Catalogue({ isMobile }) {
	return (
		<>
			<CatalogueHeaderContainer />
			<div className="container">
				{isMobile ? (
					<FiltersDrawerContainer>
						<FiltersSidebarContainer />
					</FiltersDrawerContainer>
				) : (
					<FiltersSidebarContainer />
				)}
				<GuitarListContainer />
			</div>
		</>
	);
}
