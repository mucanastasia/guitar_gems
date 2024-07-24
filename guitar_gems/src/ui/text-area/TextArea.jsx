import {
	TextField as AriaTextField,
	TextArea as AriaTextArea,
	FieldError as AriaFieldError,
} from 'react-aria-components';
import './TextArea.css';

export function TextArea({ name, value, onChange, placeholder }) {
	return (
		<AriaTextField
			name={name}
			aria-label={name}
			isRequired
			value={value}
			onChange={onChange}>
			<AriaTextArea placeholder={placeholder} />
			<AriaFieldError />
		</AriaTextField>
	);
}
