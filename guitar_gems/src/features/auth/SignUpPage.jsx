import { AuthWrapperContainer } from './containers/AuthWrapperContainer';
import { SignUpFormContainer } from './containers/SignUpFormContainer';

export function SignUpPage() {
	return (
		<AuthWrapperContainer>
			<SignUpFormContainer />
		</AuthWrapperContainer>
	);
}
