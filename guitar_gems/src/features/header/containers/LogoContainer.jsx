import { useSelectedFilters } from '@features/catalogue/contexts/SelectedFiltersContext';
import { useRouteMatch } from 'react-router-dom';
import { ROOT_PATH } from '../../router/constants/routePaths';
import { Logo } from '@ui/link';

export function LogoContainer() {
	const { handleResetFilters } = useSelectedFilters();
	const isRootPage = Boolean(useRouteMatch(ROOT_PATH)?.isExact);

	const handleLogoClick = () => {
		if (isRootPage) {
			handleResetFilters();
		}
	};

	return <Logo path={ROOT_PATH} onClick={handleLogoClick} />;
}
