import { Label as AriaLabel } from 'react-aria-components';
import './Label.css';

export function Label({ children }) {
	return <AriaLabel>{children}</AriaLabel>;
}
