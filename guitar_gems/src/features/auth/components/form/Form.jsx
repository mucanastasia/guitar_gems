import { Form as AriaForm } from 'react-aria-components';
import './Form.css';

export function Form({ children, onSubmit }) {
	return <AriaForm onSubmit={onSubmit}>{children}</AriaForm>;
}
