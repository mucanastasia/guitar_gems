import { Logo } from '@ui/link';
import { NavigationContainer } from '../../containers';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import './Header.css';

export function Header() {
	return (
		<header>
			<Logo path={ROOT_PATH} />
			<NavigationContainer />
		</header>
	);
}
