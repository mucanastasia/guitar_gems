import { AuthWrapperContainer } from './containers/AuthWrapperContainer';
import { SignInFormContainer } from './containers/SignInFormContainer';

export function SignInPage() {
	return (
		<AuthWrapperContainer>
			<SignInFormContainer />
		</AuthWrapperContainer>
	);
}
