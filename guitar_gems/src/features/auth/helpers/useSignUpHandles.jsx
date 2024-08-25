import { useState } from 'react';
import { validateEmail } from './formHelpers';

export const useSignUpHandles = ({ ...props }) => {
	const { nameRef, emailRef, passwordRef, confirmedPasswordRef } = props;

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
		setErrorMessage({ ...errorMessage, general: '', name: '' });
		nameRef.current.value = e.target.value;
	};

	const handleBlurName = (e) => {
		if (e.target.value.trim().length === 0) {
			setErrorMessage({ ...errorMessage, name: 'Please fill in this field' });
		} else if (e.target.value.trim().length > 20) {
			setErrorMessage({
				...errorMessage,
				name: 'Name must include less than 20 symbols',
			});
		}
	};

	const handleChangeEmail = (e) => {
		setErrorMessage({ ...errorMessage, general: '', email: '' });
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
		setErrorMessage({ ...errorMessage, general: '', password: '' });
		passwordRef.current.value = e.target.value;
		if (
			confirmedPasswordRef.current.value.length >= 6 &&
			e.target.value.length >= 6 &&
			e.target.value === confirmedPasswordRef.current.value
		) {
			setErrorMessage({ ...errorMessage, confirmedPass: '', password: '' });
		}
	};

	const handleBlurPassword = (e) => {
		if (e.target.value.trim().length === 0) {
			setErrorMessage({ ...errorMessage, password: 'Please fill in this field' });
		} else if (e.target.value.length < 6) {
			setErrorMessage({
				...errorMessage,
				password: 'Password must include at least 6 symbols',
			});
		} else if (
			confirmedPasswordRef.current.value &&
			e.target.value !== confirmedPasswordRef.current.value
		) {
			setErrorMessage({
				...errorMessage,
				password: 'Password and Confirmed Password must be the same',
			});
		}
	};

	const handleChangeConfirmedPassword = (e) => {
		setErrorMessage({ ...errorMessage, general: '', confirmedPass: '' });
		confirmedPasswordRef.current.value = e.target.value;
		if (
			passwordRef.current.value.length >= 6 &&
			e.target.value.length >= 6 &&
			e.target.value === passwordRef.current.value
		) {
			console.log('handle confirmed: resettting error message');
			setErrorMessage((prev) => {
				return { ...prev, confirmedPass: '', password: '' };
			});
		}
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

	return {
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
	};
};
