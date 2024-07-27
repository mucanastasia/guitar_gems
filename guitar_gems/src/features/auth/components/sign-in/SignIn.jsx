import { TextField } from '@ui/text-field';
import { PasswordField } from '@ui/password-field';
import { Button } from '@ui/button';
import { TextError } from '@ui/text-error';
import { SIGN_IN_NAME } from '../../constants/auth';

export function SignIn({ ...props }) {
	const {
		emailRef,
		passwordRef,
		error: { email: emailError, password: passwordError, general: generalError },
		loading,
		fieldType,
		handleChangeEmail,
		handleBlurEmail,
		handleChangePassword,
		handleBlurPassword,
		handleClickVisible,
	} = props;

	return (
		<>
			<TextField
				name="Email"
				refValue={emailRef}
				onChange={handleChangeEmail}
				onBlur={handleBlurEmail}
				error={emailError}
			/>
			<PasswordField
				name="Password"
				type={fieldType}
				refValue={passwordRef}
				onChange={handleChangePassword}
				onBlur={handleBlurPassword}
				onIconClick={handleClickVisible}
				error={passwordError}
			/>
			<Button state="primary" type="submit">
				{loading ? 'Loading...' : SIGN_IN_NAME}
			</Button>
			<TextError>{generalError}</TextError>
		</>
	);
}
