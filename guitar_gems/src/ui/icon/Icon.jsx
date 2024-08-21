import { Button } from 'react-aria-components';
import './Icon.css';

export function Icon({ name, color = 'black', size = 'large' }) {
	return <span className={`material-symbols-outlined ${color} ${size}`}>{name}</span>;
}

export function IconButton({
	name,
	color = 'black',
	size = 'large',
	onClick,
	dataRec,
	className = 'icon-button',
	disabled = false,
}) {
	return (
		<Button
			className={className}
			onPress={onClick}
			data-rec={dataRec || undefined}
			isDisabled={disabled}>
			<Icon name={name} color={color} size={size} />
		</Button>
	);
}
