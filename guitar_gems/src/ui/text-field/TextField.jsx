import { TextField as AriaTextField, Input } from 'react-aria-components';
import './TextField.css';

export function TextField({ name, refValue, onChange, onBlur, error }) {
	return (
		<AriaTextField name={name} type="text" aria-label={`${name} input`}>
			<Input placeholder={name} ref={refValue} onChange={onChange} onBlur={onBlur} />
			<span className="error">{error && error}</span>
		</AriaTextField>
	);
}
