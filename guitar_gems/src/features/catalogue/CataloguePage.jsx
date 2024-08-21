import { CatalogueContainer } from './containers/CatalogueContainer';
import { PROJECT_NAME } from './constants/catalogue';
import { useTitle } from '@helpers/useTitle';
import { CompareBarContainer } from '@features/comparison/containers/CompareBarContainer';

export function CataloguePage() {
	useTitle(PROJECT_NAME);

	return (
		<>
			<CatalogueContainer />
			<CompareBarContainer />
		</>
	);
}
