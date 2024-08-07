import { useRef } from 'react';
import { useSignInHandles } from '../helpers/useSignInHandles';
import { Form } from '../components/form';
import { validateEmail, clearInputs, clearErrors } from '../helpers/formHelpers';
import { TextField } from '@ui/text-field';
import { PasswordField } from '@ui/password-field';
import { Button } from '@ui/button';
import { TextError } from '@ui/text-error';
import { SIGN_IN_NAME } from '../constants/auth';
import { useSignIn } from '@api/useSignIn';

export function SignInFormContainer() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const {
		errorMessage,
		setErrorMessage,
		fieldType,
		handleBlurEmail,
		handleChangeEmail,
		handleBlurPassword,
		handleChangePassword,
		handleClickVisible,
	} = useSignInHandles({ emailRef, passwordRef });

	const {
		email: emailError,
		password: passwordError,
		general: generalError,
	} = errorMessage;

	const { mutate, isPending } = useSignIn();

	const handleSignIn = async (e) => {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		if (email.length === 0 && password.length === 0) {
			setErrorMessage({
				...errorMessage,
				email: 'Please fill in this field',
				password: 'Please fill in this field',
			});
		} else if (email.length === 0) {
			setErrorMessage({ ...errorMessage, email: 'Please fill in this field' });
		} else if (password.length === 0) {
			setErrorMessage({
				...errorMessage,
				password: 'Please fill in this field',
			});
		}

		if (validateEmail(email) && password.length >= 6) {
			await mutate(
				{ email, password },
				{
					onSuccess: () => {
						clearInputs(emailRef, passwordRef);
						clearErrors(setErrorMessage);
					},
					onError: (mutationError) => {
						if (mutationError.message === 'Invalid login credentials') {
							setErrorMessage({
								...errorMessage,
								general: 'Invalid email or password. Please try again',
							});
						} else if (mutationError.message) {
							setErrorMessage({
								...errorMessage,
								general: mutationError.message,
							});
						}
					},
				}
			);
		}
	};

	return (
		<Form onSubmit={handleSignIn}>
			<TextField
				name="Email"
				refValue={emailRef}
				onChange={handleChangeEmail}
				onBlur={handleBlurEmail}
				error={emailError}
			/>
			<PasswordField
				name="Password"
				type={fieldType}
				refValue={passwordRef}
				onChange={handleChangePassword}
				onBlur={handleBlurPassword}
				onIconClick={handleClickVisible}
				error={passwordError}
			/>
			<Button state="primary" type="submit">
				{isPending ? 'Loading...' : SIGN_IN_NAME}
			</Button>
			<TextError>{generalError}</TextError>
		</Form>
	);
}
