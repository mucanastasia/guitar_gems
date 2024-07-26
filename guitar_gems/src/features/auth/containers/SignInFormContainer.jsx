import { useSignIn } from '../helpers/useSignIn';
import { Form } from '../components/form/Form';
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

	return (
		<Form onSubmit={handleSignIn}>
			<SignIn
				loading={loading}
				emailRef={emailRef}
				passwordRef={passwordRef}
				error={errorMessage}
				fieldType={fieldType}
				handleBlurEmail={handleBlurEmail}
				handleChangeEmail={handleChangeEmail}
				handleBlurPassword={handleBlurPassword}
				handleChangePassword={handleChangePassword}
				handleClickVisible={handleClickVisible}
			/>
		</Form>
	);
}
