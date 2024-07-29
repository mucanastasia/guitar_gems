import { useSignIn } from '../helpers/useSignIn';
import { Form } from '../components/form';
import { SignIn } from '../components/sign-in';

export function SignInFormContainer() {
	const {
		emailRef,
		passwordRef,
		errorMessage,
		loading,
		fieldType,
		handleSignIn,
		handleBlurEmail,
		handleChangeEmail,
		handleBlurPassword,
		handleChangePassword,
		handleClickVisible,
	} = useSignIn();

	const props = {
		loading,
		emailRef,
		passwordRef,
		error: errorMessage,
		fieldType,
		handleBlurEmail,
		handleChangeEmail,
		handleBlurPassword,
		handleChangePassword,
		handleClickVisible,
	};

	return (
		<Form onSubmit={handleSignIn}>
			<SignIn {...props} />
		</Form>
	);
}
