import { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { supabase } from '@api/supabaseClient';
import { validateEmail, clearInputs, clearErrors } from '../helpers/formHelpers';
import { ROOT_PATH } from '@features/router/constants/routePaths';

export const useSignUp = () => {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmedPasswordRef = useRef(null);

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
		} else if (e.target.value.trim().length > 20) {
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
		if (
			confirmedPasswordRef.current.value >= 6 &&
			e.target.value >= 6 &&
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
		setErrorMessage({ ...errorMessage, confirmedPass: '' });
		confirmedPasswordRef.current.value = e.target.value;
		if (
			passwordRef.current.value >= 6 &&
			e.target.value >= 6 &&
			e.target.value === passwordRef.current.value
		) {
			setErrorMessage({ ...errorMessage, confirmedPass: '', password: '' });
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
		nameRef,
		emailRef,
		passwordRef,
		confirmedPasswordRef,
		loading,
		fieldType,
		errorMessage,
		handleSignUp,
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
