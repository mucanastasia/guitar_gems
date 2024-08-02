import { CatalogueContainer } from './containers/CatalogueContainer';
import { SelectedFiltersProvider } from '@features/catalogue/contexts/SelectedFiltersContext';
import { PROJECT_NAME } from '@features/catalogue/constants/catalogue';
import { useTitle } from '@helpers/useTitle';

export function CataloguePage() {
	useTitle(PROJECT_NAME);

	return (
		<SelectedFiltersProvider>
			<CatalogueContainer />
		</SelectedFiltersProvider>
	);
}
