import { TextField as AriaTextField, Input } from 'react-aria-components';
import { IconButton } from '@ui/icon';
import './PasswordField.css';

export function PasswordField({
	name,
	type,
	refValue,
	onChange,
	onBlur,
	onIconClick,
	dataRec,
	error,
}) {
	return (
		<AriaTextField className="password-field" name={name} type={type} aria-label={name}>
			<Input placeholder={name} ref={refValue} onChange={onChange} onBlur={onBlur} />
			<IconButton
				name={type === 'password' ? 'visibility' : 'visibility_off'}
				color="grey"
				onClick={onIconClick}
				dataRec={dataRec}
			/>
			<span className="error">{error && error}</span>
		</AriaTextField>
	);
}
