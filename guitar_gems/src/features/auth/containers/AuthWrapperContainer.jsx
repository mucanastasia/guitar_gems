import { useWindowWidth } from '@helpers/useWindowWidth';
import { AuthWrapper } from '../components/auth-wrapper';
import { useRouteMatch } from 'react-router-dom';
import { SIGN_IN_PATH, ROOT_PATH } from '@features/router/constants/routePaths';
import { SIGN_IN_NAME, SIGN_UP_NAME } from '../constants/auth';

export function AuthWrapperContainer({ children }) {
	const isMobile = useWindowWidth();

	const isOnSignInPage = Boolean(useRouteMatch(SIGN_IN_PATH));

	const name = isOnSignInPage ? SIGN_IN_NAME : SIGN_UP_NAME;

	return (
		<AuthWrapper isDesktop={!isMobile} name={name} path={ROOT_PATH}>
			{children}
		</AuthWrapper>
	);
}
