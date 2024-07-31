import { useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import {
	SIGN_IN_PATH,
	SIGN_UP_PATH,
	ROOT_PATH,
} from '@features/router/constants/routePaths';
import {
	SIGN_IN_NAME,
	SIGN_UP_NAME,
	PROMPT_TEXT_SIGN_IN,
	PROMPT_TEXT_SIGN_UP,
} from '../constants/auth';
import { Text } from '@ui/text';
import { LinkAuth } from '@ui/link';

export function AuthPromptContainer() {
	const location = useLocation();
	const { from } = location.state || { from: { pathname: ROOT_PATH } };

	const isOnSignInPage = Boolean(useRouteMatch(SIGN_IN_PATH));

	const name = isOnSignInPage ? SIGN_UP_NAME : SIGN_IN_NAME;
	const path = isOnSignInPage
		? { pathname: SIGN_UP_PATH, state: { from } }
		: SIGN_IN_PATH;
	const text = isOnSignInPage ? PROMPT_TEXT_SIGN_UP : PROMPT_TEXT_SIGN_IN;

	return (
		<Text size="small">
			{text}
			<LinkAuth path={path} name={name} />
		</Text>
	);
}
