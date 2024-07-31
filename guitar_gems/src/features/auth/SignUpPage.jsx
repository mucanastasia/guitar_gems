import { AuthWrapperContainer } from './containers/AuthWrapperContainer';
import { SignUpFormContainer } from './containers/SignUpFormContainer';
import { SIGN_UP_NAME } from './constants/auth';
import { useTitle } from '@helpers/useTitle';

export function SignUpPage() {
	useTitle(SIGN_UP_NAME);

	return (
		<AuthWrapperContainer>
			<SignUpFormContainer />
		</AuthWrapperContainer>
	);
}
