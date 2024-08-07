import { CatalogueContainer } from './containers/CatalogueContainer';
import { SelectedFiltersProvider } from './contexts/SelectedFiltersContext';
import { PROJECT_NAME } from './constants/catalogue';
import { useTitle } from '@helpers/useTitle';

export function CataloguePage() {
	useTitle(PROJECT_NAME);

	return (
		<SelectedFiltersProvider>
			<CatalogueContainer />
		</SelectedFiltersProvider>
	);
}
