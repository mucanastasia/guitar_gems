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
	preventDefault = false,
}) {
	return (
		<Button
			className={className}
			onPress={onClick}
			{...(preventDefault && {
				onClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
				},
			})}
			data-rec={dataRec || undefined}>
			<Icon name={name} color={color} size={size} />
		</Button>
	);
}
