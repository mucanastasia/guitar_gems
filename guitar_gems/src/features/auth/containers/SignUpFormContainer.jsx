import { useSignUp } from '../helpers/useSignUp';
import { Form } from '../components/form';
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

	const props = {
		loading,
		nameRef,
		emailRef,
		passwordRef,
		confirmedPasswordRef,
		error: errorMessage,
		fieldType,
		handleBlurName,
		handleChangeName,
		handleBlurEmail,
		handleChangeEmail,
		handleBlurPassword,
		handleChangePassword,
		handleBlurConfirmedPassword,
		handleChangeConfirmedPassword,
		handleClickVisible,
	};

	return (
		<Form onSubmit={handleSignUp}>
			<SignUp {...props} />
		</Form>
	);
}
