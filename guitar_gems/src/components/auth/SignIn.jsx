import { useState } from 'react';
import { Form, TextField, Input, Button, FieldError } from 'react-aria-components';
import { supabase } from '../../supabaseClient';
import logo from '../../assets/logo.png';
import './styles/auth.css';
import { Link, useHistory, useLocation } from 'react-router-dom';

//TODO: A button BACK!!!
//TODO: Logo as a link to main

export default function SignIn() {
    const [fieldType, setFieldType] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/guitar_gems/" } };

    const handleSignIn = async (e) => {
        setLoading(true);
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        console.log('Data: ', data);
        console.log('Error: ', error);

        setEmail('');
        setPassword('');
        setLoading(false);
        if (data && !error) history.replace(from);
    };

    const handleClickVisible = () => {
        fieldType === 'password' ? setFieldType('text') : setFieldType('password');
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="auth-form">
            <h1><img src={logo} alt="Guitar Gems logo image" />Sign In</h1>
            <Form onSubmit={handleSignIn}>
                <TextField name="email" type="email" aria-label="Email" isRequired>
                    <Input placeholder="Email"
                        value={email}
                        onChange={handleChangeEmail} />
                    <span><FieldError /></span>
                </TextField>
                <TextField className="password-field" name="password" type={fieldType} aria-label="Password" isRequired >
                    <Input placeholder="Password"
                        value={password}
                        onChange={handleChangePassword} />
                    <Button className="material-symbols-outlined" onPress={handleClickVisible} >
                        {fieldType === 'password' ? 'visibility' : 'visibility_off'}
                    </Button>
                    <span><FieldError /></span>
                </TextField>
                <Button type="submit">{loading ? 'Loading...' : 'Sign In'}</Button>
            </Form>

            <p>{`Don't have an account?`}<Link to={{ pathname: '/guitar_gems/sign-up', state: { from } }}>Sign up</Link></p>
        </div>
    );
}