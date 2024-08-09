import { Switch as AriaSwitch } from 'react-aria-components';
import { Label } from '@ui/label';
import './Switch.css';

export function Switch({ label, theme, onChange }) {
	return (
		<AriaSwitch onChange={onChange} isSelected={theme === 'dark'}>
			<div className="indicator" />
			<Label>{label}</Label>
		</AriaSwitch>
	);
}
