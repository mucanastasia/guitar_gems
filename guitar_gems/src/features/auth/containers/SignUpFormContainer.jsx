import { useSignUp } from '../helpers/useSignUp';
import { Form } from '../components/form/Form';
import { SignUp } from '../components/sign-up';

export function SignUpFormContainer() {
	const {
		nameRef,
		emailRef,
		passwordRef,
		confirmedPasswordRef,
		loading,
		fieldType,
		errorMessage,
		handleSignUp,
		handleClickVisible,
		handleChangeName,
		handleBlurName,
		handleChangeEmail,
		handleBlurEmail,
		handleChangePassword,
		handleBlurPassword,
		handleChangeConfirmedPassword,
		handleBlurConfirmedPassword,
	} = useSignUp();

	return (
		<Form onSubmit={handleSignUp}>
			<SignUp
				loading={loading}
				nameRef={nameRef}
				emailRef={emailRef}
				passwordRef={passwordRef}
				confirmedPasswordRef={confirmedPasswordRef}
				error={errorMessage}
				fieldType={fieldType}
				handleBlurName={handleBlurName}
				handleChangeName={handleChangeName}
				handleBlurEmail={handleBlurEmail}
				handleChangeEmail={handleChangeEmail}
				handleBlurPassword={handleBlurPassword}
				handleChangePassword={handleChangePassword}
				handleBlurConfirmedPassword={handleBlurConfirmedPassword}
				handleChangeConfirmedPassword={handleChangeConfirmedPassword}
				handleClickVisible={handleClickVisible}
			/>
		</Form>
	);
}
