import {
	TextField as AriaTextField,
	Input,
	FieldError as AriaFieldError,
} from 'react-aria-components';
import './EditorField.css';

export function EditorField({ name, value, onChange, placeholder }) {
	return (
		<AriaTextField aria-label={name} isRequired type="text">
			<Input value={value} onChange={onChange} placeholder={placeholder} />
			<AriaFieldError />
		</AriaTextField>
	);
}
