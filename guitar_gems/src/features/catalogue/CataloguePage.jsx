import { CatalogueContainer } from './containers/CatalogueContainer';
import { PROJECT_NAME } from './constants/catalogue';
import { useTitle } from '@helpers/useTitle';

export function CataloguePage() {
	useTitle(PROJECT_NAME);

	return <CatalogueContainer />;
}
