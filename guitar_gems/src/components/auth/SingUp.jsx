import { useState } from 'react';
import { Form, TextField, Input, Button, FieldError } from 'react-aria-components';
import { supabase } from '../../supabaseClient';
import logo from '../../assets/logo.png';
import './styles/auth.css';
import { Link, useHistory, useLocation } from 'react-router-dom';

//TODO: A button BACK!!!

export default function SignUp() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
    });

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const [loading, setLoading] = useState(false);

    const [fieldType, setFieldType] = useState(
        {
            password: 'password',
            confirmedPass: 'password',
        }
    );

    const handleClickVisible = (e) => {
        const targetAtr = e.target.getAttribute('data-rec');
        if (targetAtr === 'password') {
            fieldType.password === 'password' ? setFieldType({ ...fieldType, password: 'text' }) : setFieldType({ ...fieldType, password: 'password' });
        } else if (targetAtr === 'confirmed-password') {
            fieldType.confirmedPass === 'password' ? setFieldType({ ...fieldType, confirmedPass: 'text' }) : setFieldType({ ...fieldType, confirmedPass: 'password' });
        }
    };

    const handleChangeName = (e) => {
        setUser({ ...user, name: e.target.value });
    };

    const handleChangeEmail = (e) => {
        setUser({ ...user, email: e.target.value });
    };

    const handleChangePassword = (e) => {
        setUser({ ...user, password: e.target.value });
    };

    const handleChangeConfirmedPassword = (e) => {
        setUser({ ...user, confirmedPassword: e.target.value });
    };

    const handleSingUp = async (e) => {
        setLoading(true);
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp(
            {
                email: user.email,
                password: user.password,
                options: {
                    data: {
                        name: user.name,
                    }
                }
            }
        );

        console.log('Data: ', data);
        console.log('Error: ', error);

        setUser({
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
        });

        setLoading(false);
        if (data && !error) history.replace(from);
    };

    return (
        <div className="auth-form">
            <h1><img src={logo} alt="Guitar Gems logo image" />Sign Up</h1>
            <Form onSubmit={handleSingUp}>
                <TextField name="name" type="text" aria-label="Name" isRequired>
                    <Input
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChangeName} />
                    <span><FieldError /></span>
                </TextField>
                <TextField name="email" type="email" aria-label="Email" isRequired>
                    <Input
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChangeEmail} />
                    <span><FieldError /></span>
                </TextField>
                <TextField className="password-field" name="password" type={fieldType.password} aria-label="Password" isRequired >
                    <Input
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChangePassword} />
                    <Button className="material-symbols-outlined" onPress={handleClickVisible} data-rec="password">
                        {fieldType.password === 'password' ? 'visibility' : 'visibility_off'}
                    </Button>
                    <span><FieldError /></span>
                </TextField>
                <TextField className="password-field" name="confirmed-password" type={fieldType.confirmedPass} aria-label="Confirm Password" isRequired >
                    <Input
                        placeholder="Confirm password"
                        value={user.confirmedPassword}
                        onChange={handleChangeConfirmedPassword} />
                    <Button className="material-symbols-outlined" onPress={handleClickVisible} data-rec="confirmed-password" >
                        {fieldType.confirmedPass === 'password' ? 'visibility' : 'visibility_off'}
                    </Button>
                    <span><FieldError /></span>
                </TextField>
                <Button type="submit">{loading ? 'Loading...' : 'Sign Up'}</Button>
            </Form>

            <p>{`Already have an account?`}<Link to="/sign-in">Sign in</Link></p>
        </div>
    );
}