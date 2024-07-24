import { useState, useRef } from 'react';
import { Form, TextField, Input, FieldError } from 'react-aria-components';
import { supabase } from '@api/supabaseClient';
import { useHistory, useLocation } from 'react-router-dom';
import { HeadingLogo } from '@ui/heading-logo';
import { Icon } from '@ui/icon';
import { Button } from '@ui/button';
import './styles/auth.css';
import { LinkAuth } from '@ui/link';
import { Text } from '@ui/text';

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
		nameRef.current.value = e.target.value;
	};

	const handleChangeEmail = (e) => {
		emailRef.current.value = e.target.value;
	};

	const handleChangePassword = (e) => {
		passwordRef.current.value = e.target.value;
	};

	const handleChangeConfirmedPassword = (e) => {
		confirmedPasswordRef.current.value = e.target.value;
	};

	const handleSingUp = async (e) => {
		setLoading(true);
		e.preventDefault();

		if (passwordRef.current.value === confirmedPasswordRef.current.value) {
			const { data, error } = await supabase.auth.signUp({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				options: {
					data: {
						name: nameRef.current.value,
					},
				},
			});

			console.log('Data: ', data);
			console.log('Error: ', error);

			nameRef.current.value = '';
			emailRef.current.value = '';
			passwordRef.current.value = '';
			confirmedPasswordRef.current.value = '';

			if (data && !error) history.replace(from);
		} else {
			console.log('Password and Confirmed Password must be the same');
		}
		setLoading(false);
	};

	return (
		<div className="auth-form">
			<HeadingLogo name="Sign Up" path="/" />
			<Form onSubmit={handleSingUp}>
				<TextField name="name" type="text" aria-label="Name" isRequired>
					<Input placeholder="Name" onChange={handleChangeName} ref={nameRef} />
					<span>
						<FieldError />
					</span>
				</TextField>
				<TextField name="email" type="email" aria-label="Email" isRequired>
					<Input placeholder="Email" onChange={handleChangeEmail} ref={emailRef} />
					<span>
						<FieldError />
					</span>
				</TextField>
				<TextField
					className="password-field"
					name="password"
					type={fieldType.password}
					aria-label="Password"
					isRequired>
					<Input
						placeholder="Password"
						onChange={handleChangePassword}
						ref={passwordRef}
					/>
					<Icon
						name={fieldType.password === 'password' ? 'visibility' : 'visibility_off'}
						color="grey"
						onClick={handleClickVisible}
						dataRec="password"
					/>
					<span>
						<FieldError />
					</span>
				</TextField>
				<TextField
					className="password-field"
					name="confirmed-password"
					type={fieldType.confirmedPass}
					aria-label="Confirm Password"
					isRequired>
					<Input
						placeholder="Confirm password"
						onChange={handleChangeConfirmedPassword}
						ref={confirmedPasswordRef}
					/>
					<Icon
						name={
							fieldType.confirmedPass === 'password' ? 'visibility' : 'visibility_off'
						}
						color="grey"
						onClick={handleClickVisible}
						dataRec="confirmed-password"
					/>
					<span>
						<FieldError />
					</span>
				</TextField>
				<Button state="primary" type="submit">
					{loading ? 'Loading...' : 'Sign Up'}
				</Button>
				<span>{/*There will be an error*/}</span>
			</Form>
			<Text size="small">
				{`Already have an account?`}
				<LinkAuth path="/sign-in" name="Sign in" />
			</Text>
		</div>
	);
}
