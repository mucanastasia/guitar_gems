import { LogoContainer } from '../../containers/LogoContainer';
import { NavigationContainer } from '../../containers/NavigationContainer';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import './Header.css';

export function Header() {
	return (
		<header>
			<LogoContainer path={ROOT_PATH} />
			<NavigationContainer />
		</header>
	);
}
