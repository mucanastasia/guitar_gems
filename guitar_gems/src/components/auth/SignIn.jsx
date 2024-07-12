import { useState, useRef } from 'react';
import { Form, TextField, Input, Button } from 'react-aria-components';
import { supabase } from '../../supabaseClient';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './styles/auth.css';

export default function SignIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState({ email: '', password: '', general: '' });
    const [loading, setLoading] = useState(false);
    const [fieldType, setFieldType] = useState('password');
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const handleSignIn = async (e) => {
        setLoading(true);
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email.length === 0 && password.length === 0) {
            setErrorMessage({ ...errorMessage, email: 'Please fill in this field', password: 'Please fill in this field' });
        } else if (email.length === 0) {
            setErrorMessage({ ...errorMessage, email: 'Please fill in this field' });
        } else if (password.length === 0) {
            setErrorMessage({ ...errorMessage, password: 'Please fill in this field' });
        }

        if (validateEmail(email) && password.length >= 6) {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setErrorMessage({ ...errorMessage, general: 'Invalid email or password. Please try again' });
            }

            if (data && !error) {
                history.replace(from);
                emailRef.current.value = '';
                passwordRef.current.value = '';
                setErrorMessage({ email: '', password: '', general: '' });
            }
        }
        setLoading(false);
    };

    const validateEmail = (email) => {
        const emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        return emailPattern.test(email);
    };

    const handleBlurEmail = (e) => {
        const email = e.target.value;

        if (email.length === 0) {
            setErrorMessage({ ...errorMessage, email: 'Please fill in this field' });
        } else if (!validateEmail(email)) {
            setErrorMessage({ ...errorMessage, email: 'Please provide a correct email' });
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
            setErrorMessage({ ...errorMessage, password: 'Please fill in this field' });
        } else if (password.length < 6) {
            setErrorMessage({ ...errorMessage, password: 'Password must include at least 6 symbols' });
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
        if (errorMessage.password === 'Password must include at least 6 symbols' && password.length >= 6) {
            setErrorMessage({ ...errorMessage, password: '' });
            emailRef.current.value = password;
        }
    };

    const handleClickVisible = () => {
        fieldType === 'password' ? setFieldType('text') : setFieldType('password');
    };

    return (
        <div className="auth-form">
            <h1><img src={logo} alt="Guitar Gems logo image" onClick={() => { history.push('/') }} />Sign In</h1>
            <Form onSubmit={handleSignIn}>
                <TextField name="email" type="text" aria-label="Email">
                    <Input placeholder="Email"
                        ref={emailRef}
                        onChange={handleChangeEmail}
                        onBlur={handleBlurEmail}
                    />
                    <span className="error">{errorMessage.email && errorMessage.email}</span>
                </TextField>
                <TextField className="password-field" name="password" type={fieldType} aria-label="Password">
                    <Input placeholder="Password"
                        ref={passwordRef}
                        onChange={handleChangePassword}
                        onBlur={handleBlurPassword}
                    />
                    <Button className="material-symbols-outlined" onPress={handleClickVisible} >
                        {fieldType === 'password' ? 'visibility' : 'visibility_off'}
                    </Button>
                    <span className="error">{errorMessage.password && errorMessage.password}</span>
                </TextField>
                <Button type="submit">{loading ? 'Loading...' : 'Sign In'}</Button>
                <span className="error-general">{errorMessage.general && errorMessage.general}</span>
            </Form>
            <p>{`Don't have an account?`}<Link to={{ pathname: '/sign-up', state: { from } }}>Sign up</Link></p>
        </div>
    );
}