import { AuthWrapperContainer } from './containers/AuthWrapperContainer';
import { SignInFormContainer } from './containers/SignInFormContainer';
import { SIGN_IN_NAME } from './constants/auth';
import { useTitle } from '@helpers/useTitle';

export function SignInPage() {
	useTitle(SIGN_IN_NAME);

	return (
		<AuthWrapperContainer>
			<SignInFormContainer />
		</AuthWrapperContainer>
	);
}
