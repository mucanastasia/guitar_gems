import { useState, useRef } from 'react';
import { useSignIn } from '../helpers/useSignIn';
import { Form } from '../components/form';
import { useHistory, useLocation } from 'react-router-dom';
import { supabase } from '@api/supabaseClient';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import { validateEmail, clearInputs, clearErrors } from '../helpers/formHelpers';
import { TextField } from '@ui/text-field';
import { PasswordField } from '@ui/password-field';
import { Button } from '@ui/button';
import { TextError } from '@ui/text-error';
import { SIGN_IN_NAME } from '../constants/auth';

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
	} = useSignIn({ emailRef, passwordRef });

	const {
		email: emailError,
		password: passwordError,
		general: generalError,
	} = errorMessage;

	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: ROOT_PATH } };

	const handleSignIn = async (e) => {
		try {
			e.preventDefault();
			setLoading(true);

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
				const { data, error } = await supabase.auth.signInWithPassword({
					email: email,
					password: password,
				});

				if (error) throw error;

				if (data && !error) {
					history.replace(from);
					clearInputs();
					clearErrors();
				}
			}
		} catch (error) {
			setErrorMessage({
				...errorMessage,
				general: 'Invalid email or password. Please try again',
			});
		} finally {
			setLoading(false);
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
				{loading ? 'Loading...' : SIGN_IN_NAME}
			</Button>
			<TextError>{generalError}</TextError>
		</Form>
	);
}
