import { CompareBarContainer } from '@features/comparison/containers/CompareBarContainer';
import { ProductContainer } from './containers/ProductContainer';

export function ProductPage() {
	return (
		<>
			<ProductContainer />
			<CompareBarContainer />
		</>
	);
}
