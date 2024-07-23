import { Button as AriaButton } from 'react-aria-components';
import './Button.css';

export function Button({
	children,
	state,
	onClick,
	width = '100%',
	margin,
	type,
	disabled,
}) {
	return (
		<AriaButton
			onPress={onClick ? onClick : undefined}
			className={`${state}-button`}
			style={{ width: width, margin: margin }}
			type={type}
			isDisabled={disabled}>
			{children}
		</AriaButton>
	);
}

//primary-button
//accent-button
//secondary-button
//danger-button
//white-button
