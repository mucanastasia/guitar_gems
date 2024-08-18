import { ComparisonContainer } from './containers/ComparisonContainer';
import { useTitle } from '@helpers/useTitle';

export function ComparePage() {
	useTitle('Compare guitars');

	return <ComparisonContainer />;
}
