import { TextField } from '@ui/text-field';
import { PasswordField } from '@ui/password-field';
import { Button } from '@ui/button';
import { TextError } from '@ui/text-error';

export function SignUp({ ...props }) {
	const {
		nameRef,
		emailRef,
		passwordRef,
		confirmedPasswordRef,
		loading,
		fieldType,
		error: {
			name: nameError,
			email: emailError,
			password: passwordError,
			confirmedPass: confirmedPassError,
			general: generalError,
		},
		handleClickVisible,
		handleChangeName,
		handleBlurName,
		handleChangeEmail,
		handleBlurEmail,
		handleChangePassword,
		handleBlurPassword,
		handleChangeConfirmedPassword,
		handleBlurConfirmedPassword,
	} = props;

	return (
		<>
			<TextField
				name="Name"
				refValue={nameRef}
				onChange={handleChangeName}
				onBlur={handleBlurName}
				error={nameError}
			/>

			<TextField
				name="Email"
				refValue={emailRef}
				onChange={handleChangeEmail}
				onBlur={handleBlurEmail}
				error={emailError}
			/>

			<PasswordField
				name="Password"
				type={fieldType.password}
				refValue={passwordRef}
				onChange={handleChangePassword}
				onBlur={handleBlurPassword}
				onIconClick={handleClickVisible}
				dataRec="password"
				error={passwordError}
			/>

			<PasswordField
				name="Confirmed Password"
				type={fieldType.confirmedPass}
				refValue={confirmedPasswordRef}
				onChange={handleChangeConfirmedPassword}
				onBlur={handleBlurConfirmedPassword}
				onIconClick={handleClickVisible}
				dataRec="confirmed-password"
				error={confirmedPassError}
			/>
			<Button state="primary" type="submit">
				{loading ? 'Loading...' : 'Sign Up'}
			</Button>
			<TextError>{generalError}</TextError>
		</>
	);
}
