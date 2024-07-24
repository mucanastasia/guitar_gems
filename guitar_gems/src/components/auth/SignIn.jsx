import { useState, useRef } from 'react';
import { Form } from 'react-aria-components';
import { supabase } from '@api/supabaseClient';
import { useHistory, useLocation } from 'react-router-dom';
import { HeadingLogo } from '@ui/heading-logo';
import { Button } from '@ui/button';
import './styles/auth.css';
import { LinkAuth } from '@ui/link';
import { Text } from '@ui/text';
import { TextField } from '@ui/text-field';
import { PasswordField } from '../../ui/password-field';
import { TextError } from '../../ui/text-error';

export default function SignIn() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState({
		email: '',
		password: '',
		general: '',
	});
	const [loading, setLoading] = useState(false);
	const [fieldType, setFieldType] = useState('password');
	const history = useHistory();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: '/' } };

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

	const clearInputs = () => {
		emailRef.current.value = '';
		passwordRef.current.value = '';
	};

	const clearErrors = () => {
		setErrorMessage({ email: '', password: '', general: '' });
	};

	const validateEmail = (email) => {
		const emailPattern =
			/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		return emailPattern.test(email);
	};

	const handleBlurEmail = (e) => {
		const email = e.target.value;

		if (email.length === 0) {
			setErrorMessage({ ...errorMessage, email: 'Please fill in this field' });
		} else if (!validateEmail(email)) {
			setErrorMessage({
				...errorMessage,
				email: 'Please provide a correct email',
			});
		} else {
			setErrorMessage({ ...errorMessage, email: '' });
		}
	};

	const handleChangeEmail = (e) => {
		setErrorMessage({ ...errorMessage, general: '' });
		const email = e.target.value;
		if (errorMessage.email === 'Please fill in this field' && email.length > 0) {
			setErrorMessage({ ...errorMessage, email: '' });
		}
		if (errorMessage.email === 'Please provide a correct email' && validateEmail(email)) {
			setErrorMessage({ ...errorMessage, email: '' });
			emailRef.current.value = email;
		}
	};

	const handleBlurPassword = (e) => {
		const password = e.target.value;

		if (password.length === 0) {
			setErrorMessage({
				...errorMessage,
				password: 'Please fill in this field',
			});
		} else if (password.length < 6) {
			setErrorMessage({
				...errorMessage,
				password: 'Password must include at least 6 symbols',
			});
		} else {
			setErrorMessage({ ...errorMessage, password: '' });
		}
	};

	const handleChangePassword = (e) => {
		setErrorMessage({ ...errorMessage, general: '' });
		const password = e.target.value;
		if (errorMessage.password === 'Please fill in this field' && password.length > 0) {
			setErrorMessage({ ...errorMessage, password: '' });
		}
		if (
			errorMessage.password === 'Password must include at least 6 symbols' &&
			password.length >= 6
		) {
			setErrorMessage({ ...errorMessage, password: '' });
			emailRef.current.value = password;
		}
	};

	const handleClickVisible = () => {
		fieldType === 'password' ? setFieldType('text') : setFieldType('password');
	};

	return (
		<div className="auth-form">
			<HeadingLogo name="Sign In" path="/" />
			<Form onSubmit={handleSignIn}>
				<TextField
					name="Email"
					refValue={emailRef}
					onChange={handleChangeEmail}
					onBlur={handleBlurEmail}
					error={errorMessage.email}
				/>
				<PasswordField
					name="Password"
					type={fieldType}
					refValue={passwordRef}
					onChange={handleChangePassword}
					onBlur={handleBlurPassword}
					onIconClick={handleClickVisible}
					error={errorMessage.password}
				/>
				<Button state="primary" type="submit">
					{loading ? 'Loading...' : 'Sign In'}
				</Button>
				<TextError>{errorMessage.general}</TextError>
			</Form>
			<Text size="small">
				{`Don't have an account?`}
				<LinkAuth path={{ pathname: '/sign-up', state: { from } }} name="Sign up" />
			</Text>
		</div>
	);
}
