import { useRef } from 'react';
import { validateEmail, clearInputs, clearErrors } from '../helpers/formHelpers';
import { useSignUpHandles } from '../helpers/useSignUpHandles';
import { Form } from '../components/form';
import { TextField } from '@ui/text-field';
import { PasswordField } from '@ui/password-field';
import { Button } from '@ui/button';
import { TextError } from '@ui/text-error';
import { SIGN_UP_NAME } from '../constants/auth';
import { useSignUp } from '@api/useSignUp';

export function SignUpFormContainer() {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmedPasswordRef = useRef(null);

	const {
		errorMessage,
		setErrorMessage,
		fieldType,
		handleClickVisible,
		handleChangeName,
		handleBlurName,
		handleChangeEmail,
		handleBlurEmail,
		handleChangePassword,
		handleBlurPassword,
		handleChangeConfirmedPassword,
		handleBlurConfirmedPassword,
	} = useSignUpHandles({ nameRef, emailRef, passwordRef, confirmedPasswordRef });

	const {
		name: nameError,
		email: emailError,
		password: passwordError,
		confirmedPass: confirmedPassError,
		general: generalError,
	} = errorMessage;

	const { mutate, isPending } = useSignUp();

	const handleSignUp = async (e) => {
		e.preventDefault();

		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const confirmedPass = confirmedPasswordRef.current.value;

		if (
			name.trim().length === 0 ||
			email.trim().length === 0 ||
			password.trim().length === 0 ||
			confirmedPass.trim().length === 0
		) {
			setErrorMessage({
				...errorMessage,
				name: name.trim().length === 0 ? 'Please fill in this field' : errorMessage.name,
				email:
					email.trim().length === 0 ? 'Please fill in this field' : errorMessage.email,
				password:
					password.trim().length === 0
						? 'Please fill in this field'
						: errorMessage.password,
				confirmedPass:
					confirmedPass.trim().length === 0
						? 'Please fill in this field'
						: errorMessage.confirmedPass,
			});
			return;
		}

		if (name && password && email && confirmedPass) {
			if (!validateEmail(email)) {
				setErrorMessage({
					...errorMessage,
					email: 'Please provide a correct email',
				});
				return;
			}
			if (password === confirmedPass) {
				await mutate(
					{ email, password, name },
					{
						onSuccess: () => {
							clearInputs();
							clearErrors();
						},
						onError: (mutationError) => {
							if (mutationError.message) {
								setErrorMessage({
									...errorMessage,
									general: mutationError.message,
								});
							}
						},
					}
				);
			} else {
				setErrorMessage({
					...errorMessage,
					confirmedPass: 'Password and Confirmed Password must be the same',
				});
			}
		}
	};

	return (
		<Form onSubmit={handleSignUp}>
			<TextField
				name="Name"
				refValue={nameRef}
				onChange={handleChangeName}
				onBlur={handleBlurName}
				error={nameError}
			/>

			<TextField
				name="Email"
				refValue={emailRef}
				onChange={handleChangeEmail}
				onBlur={handleBlurEmail}
				error={emailError}
			/>

			<PasswordField
				name="Password"
				type={fieldType.password}
				refValue={passwordRef}
				onChange={handleChangePassword}
				onBlur={handleBlurPassword}
				onIconClick={handleClickVisible}
				dataRec="password"
				error={passwordError}
			/>

			<PasswordField
				name="Confirmed Password"
				type={fieldType.confirmedPass}
				refValue={confirmedPasswordRef}
				onChange={handleChangeConfirmedPassword}
				onBlur={handleBlurConfirmedPassword}
				onIconClick={handleClickVisible}
				dataRec="confirmed-password"
				error={confirmedPassError}
			/>
			<Button state="primary" type="submit">
				{isPending ? 'Loading...' : SIGN_UP_NAME}
			</Button>
			<TextError>{generalError}</TextError>
		</Form>
	);
}
