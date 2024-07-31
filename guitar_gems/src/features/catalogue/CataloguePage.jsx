import { CatalogueContainer } from './containers/CatalogueContainer';
import { FiltersProvider } from '@features/catalogue/contexts/FiltersContext';
import { PROJECT_NAME } from '@features/catalogue/constants/catalogue';
import { useTitle } from '@helpers/useTitle';

export function CataloguePage() {
	useTitle(PROJECT_NAME);

	return (
		<FiltersProvider>
			<CatalogueContainer />
		</FiltersProvider>
	);
}
