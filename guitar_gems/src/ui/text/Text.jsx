import './Text.css';

export function TextLarge({ text, bold = false, theme = 'light' }) {
	return <p className={`text-large ${theme} ${bold && 'bold'}`}>{text}</p>;
}

export function TextMedium({ text, bold = false, theme = 'light' }) {
	return <p className={`text-medium ${theme} ${bold && 'bold'}`}>{text}</p>;
}

export function TextSmall({ text, bold = false, theme = 'light' }) {
	return <p className={`text-small ${theme} ${bold && 'bold'}`}>{text}</p>;
}
