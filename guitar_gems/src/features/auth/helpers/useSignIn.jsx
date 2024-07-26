import { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { supabase } from '@api/supabaseClient';
import { validateEmail, clearInputs, clearErrors } from '../helpers/formHelpers';
import { ROOT_PATH } from '@features/router/constants/routePaths';

export const useSignIn = () => {
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

	return {
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
	};
};
