import { useWindowWidth } from '@helpers/useWindowWidth';
import { AuthWrapper } from '../components/auth-wrapper';
import { useRouteMatch } from 'react-router-dom';
import { SIGN_IN_PATH, ROOT_PATH } from '@features/router/constants/routePaths';

export function AuthWrapperContainer({ children }) {
	const isMobile = useWindowWidth();

	const isOnSignInPage = Boolean(useRouteMatch(SIGN_IN_PATH));

	const name = isOnSignInPage ? 'Sign In' : 'Sign Up';

	return (
		<AuthWrapper isDesktop={!isMobile} name={name} path={ROOT_PATH}>
			{children}
		</AuthWrapper>
	);
}
