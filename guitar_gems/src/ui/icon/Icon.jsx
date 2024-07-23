import './Icon.css';

export function Icon({ name, color = 'black', size = 'large', onClick, dataRec }) {
	return (
		<span
			className={`material-symbols-outlined ${color} ${size}`}
			onClick={onClick ? onClick : undefined}
			data-rec={dataRec ? dataRec : undefined}>
			{name}
		</span>
	);
}
