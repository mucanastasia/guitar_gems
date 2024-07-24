import { useState, useRef } from 'react';
import { Form } from 'react-aria-components';
import { supabase } from '@api/supabaseClient';
import { useHistory, useLocation } from 'react-router-dom';
import { HeadingLogo } from '@ui/heading-logo';
import { Button } from '@ui/button';
import './styles/auth.css';
import { LinkAuth } from '@ui/link';
import { Text } from '@ui/text';
import { TextError } from '@ui/text-error';
import { PasswordField } from '@ui/password-field';
import { TextField } from '@ui/text-field';

export default function SignUp() {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmedPasswordRef = useRef(null);

	let history = useHistory();
	let location = useLocation();

	let { from } = location.state || { from: { pathname: '/' } };

	const [loading, setLoading] = useState(false);

	const [fieldType, setFieldType] = useState({
		password: 'password',
		confirmedPass: 'password',
	});

	const [errorMessage, setErrorMessage] = useState({
		name: '',
		email: '',
		password: '',
		confirmedPass: '',
		general: '',
	});

	const handleClickVisible = (e) => {
		const targetAtr = e.target.getAttribute('data-rec');
		if (targetAtr === 'password') {
			fieldType.password === 'password'
				? setFieldType({ ...fieldType, password: 'text' })
				: setFieldType({ ...fieldType, password: 'password' });
		} else if (targetAtr === 'confirmed-password') {
			fieldType.confirmedPass === 'password'
				? setFieldType({ ...fieldType, confirmedPass: 'text' })
				: setFieldType({ ...fieldType, confirmedPass: 'password' });
		}
	};

	const handleChangeName = (e) => {
		setErrorMessage({ ...errorMessage, name: '' });
		nameRef.current.value = e.target.value;
	};

	const handleBlurName = (e) => {
		if (e.target.value.trim().length === 0) {
			setErrorMessage({ ...errorMessage, name: 'Please fill in this field' });
		} else if (e.target.value.length > 20) {
			setErrorMessage({
				...errorMessage,
				name: 'Name must include less than 20 symbols',
			});
		}
	};

	const handleChangeEmail = (e) => {
		setErrorMessage({ ...errorMessage, email: '' });
		emailRef.current.value = e.target.value;
	};

	const handleBlurEmail = (e) => {
		if (e.target.value.trim().length === 0) {
			setErrorMessage({ ...errorMessage, email: 'Please fill in this field' });
		} else if (!validateEmail(e.target.value)) {
			setErrorMessage({
				...errorMessage,
				email: 'Please provide a correct email',
			});
		}
	};

	const handleChangePassword = (e) => {
		setErrorMessage({ ...errorMessage, password: '' });
		passwordRef.current.value = e.target.value;
	};

	const handleBlurPassword = (e) => {
		if (e.target.value.trim().length === 0) {
			setErrorMessage({ ...errorMessage, password: 'Please fill in this field' });
		} else if (e.target.value.length < 6) {
			setErrorMessage({
				...errorMessage,
				password: 'Password must include at least 6 symbols',
			});
		}
	};

	const handleChangeConfirmedPassword = (e) => {
		setErrorMessage({ ...errorMessage, confirmedPass: '' });
		confirmedPasswordRef.current.value = e.target.value;
	};

	const handleBlurConfirmedPassword = (e) => {
		if (e.target.value.trim().length === 0) {
			setErrorMessage({ ...errorMessage, confirmedPass: 'Please fill in this field' });
		} else if (e.target.value.length < 6) {
			setErrorMessage({
				...errorMessage,
				confirmedPass: 'Password must include at least 6 symbols',
			});
		} else if (e.target.value !== passwordRef.current.value) {
			setErrorMessage({
				...errorMessage,
				confirmedPass: 'Password and Confirmed Password must be the same',
			});
		}
	};

	const validateEmail = (email) => {
		const emailPattern =
			/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		return emailPattern.test(email);
	};

	const handleSingUp = async (e) => {
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

	const clearInputs = () => {
		nameRef.current.value = '';
		emailRef.current.value = '';
		passwordRef.current.value = '';
		confirmedPasswordRef.current.value = '';
	};

	const clearErrors = () => {
		setErrorMessage({
			name: '',
			email: '',
			password: '',
			confirmedPass: '',
			general: '',
		});
	};

	return (
		<div className="auth-form">
			<HeadingLogo name="Sign Up" path="/" />
			<Form onSubmit={handleSingUp}>
				<TextField
					name="Name"
					refValue={nameRef}
					onChange={handleChangeName}
					onBlur={handleBlurName}
					error={errorMessage.name}
				/>

				<TextField
					name="Email"
					refValue={emailRef}
					onChange={handleChangeEmail}
					onBlur={handleBlurEmail}
					error={errorMessage.email}
				/>

				<PasswordField
					name="Password"
					type={fieldType.password}
					refValue={passwordRef}
					onChange={handleChangePassword}
					onBlur={handleBlurPassword}
					onIconClick={handleClickVisible}
					dataRec="password"
					error={errorMessage.password}
				/>

				<PasswordField
					name="Confirmed Password"
					type={fieldType.confirmedPass}
					refValue={confirmedPasswordRef}
					onChange={handleChangeConfirmedPassword}
					onBlur={handleBlurConfirmedPassword}
					onIconClick={handleClickVisible}
					dataRec="confirmed-password"
					error={errorMessage.confirmedPass}
				/>
				<Button state="primary" type="submit">
					{loading ? 'Loading...' : 'Sign Up'}
				</Button>
				<TextError>{errorMessage.general}</TextError>
			</Form>
			<Text size="small">
				{`Already have an account?`}
				<LinkAuth path="/sign-in" name="Sign in" />
			</Text>
		</div>
	);
}
