import { AuthPrompt } from '../components/auth-prompt';
import { useRouteMatch } from 'react-router-dom';
import {
	SIGN_IN_PATH,
	SIGN_UP_PATH,
	ROOT_PATH,
} from '@features/router/constants/routePaths';
import { useLocation } from 'react-router-dom';

export function AuthPromptContainer() {
	const location = useLocation();
	const { from } = location.state || { from: { pathname: ROOT_PATH } };

	const isOnSignInPage = Boolean(useRouteMatch(SIGN_IN_PATH));

	const name = isOnSignInPage ? 'Sign Up' : 'Sign In';
	const path = isOnSignInPage
		? { pathname: SIGN_UP_PATH, state: { from } }
		: SIGN_IN_PATH;
	const text = isOnSignInPage ? `Don't have an account?` : 'Already have an account?';

	return <AuthPrompt text={text} name={name} path={path} />;
}
