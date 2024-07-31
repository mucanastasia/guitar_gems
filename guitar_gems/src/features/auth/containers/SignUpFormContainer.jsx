import { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { supabase } from '@api/supabaseClient';
import { validateEmail, clearInputs, clearErrors } from '../helpers/formHelpers';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import { useSignUp } from '../helpers/useSignUp';
import { Form } from '../components/form';
import { TextField } from '@ui/text-field';
import { PasswordField } from '@ui/password-field';
import { Button } from '@ui/button';
import { TextError } from '@ui/text-error';
import { SIGN_UP_NAME } from '../constants/auth';

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
	} = useSignUp({ nameRef, emailRef, passwordRef, confirmedPasswordRef });

	const {
		name: nameError,
		email: emailError,
		password: passwordError,
		confirmedPass: confirmedPassError,
		general: generalError,
	} = errorMessage;

	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: ROOT_PATH } };

	const handleSignUp = async (e) => {
		try {
			setLoading(true);
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
					name:
						name.trim().length === 0 ? 'Please fill in this field' : errorMessage.name,
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
					const { data, error } = await supabase.auth.signUp({
						email: emailRef.current.value,
						password: passwordRef.current.value,
						options: {
							data: {
								name: nameRef.current.value,
							},
						},
					});

					if (error) throw error;

					if (data && !error) {
						history.replace(from);
						clearInputs();
						clearErrors();
					}
				} else {
					setErrorMessage({
						...errorMessage,
						confirmedPass: 'Password and Confirmed Password must be the same',
					});
				}
			}
		} catch (error) {
			setErrorMessage({
				...errorMessage,
				general: error.message,
			});
		} finally {
			setLoading(false);
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
				{loading ? 'Loading...' : SIGN_UP_NAME}
			</Button>
			<TextError>{generalError}</TextError>
		</Form>
	);
}
