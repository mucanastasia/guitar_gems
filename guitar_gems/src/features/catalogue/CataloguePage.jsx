import { CatalogueContainer } from './containers/CatalogueContainer';
import { FiltersProvider } from '@features/catalogue/contexts/FiltersContext';

export function CataloguePage() {
	return (
		<FiltersProvider>
			<CatalogueContainer />
		</FiltersProvider>
	);
}
