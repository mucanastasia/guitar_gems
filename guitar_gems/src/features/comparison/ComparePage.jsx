import { useTitle } from '@helpers/useTitle';
import { HeadingLogo } from '@ui/heading-logo';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import { ComparisonContainer } from './containers/ComparisonContainer';
import { COMPARE_TITLE } from './constants/comparison';
import { CompareWrap } from './components/compare-wrap';

export function ComparePage() {
	useTitle('Compare guitars');

	return (
		<CompareWrap>
			<HeadingLogo path={ROOT_PATH} name={COMPARE_TITLE} />
			<ComparisonContainer />
		</CompareWrap>
	);
}
