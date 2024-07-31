import { useState } from 'react';
import { validateEmail } from '../helpers/formHelpers';

export const useSignIn = ({ emailRef, passwordRef }) => {
	const [errorMessage, setErrorMessage] = useState({
		email: '',
		password: '',
		general: '',
	});

	const [fieldType, setFieldType] = useState('password');

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
			passwordRef.current.value = password;
		}
	};

	const handleClickVisible = () => {
		fieldType === 'password' ? setFieldType('text') : setFieldType('password');
	};

	return {
		errorMessage,
		setErrorMessage,
		fieldType,
		handleBlurEmail,
		handleChangeEmail,
		handleBlurPassword,
		handleChangePassword,
		handleClickVisible,
	};
};
