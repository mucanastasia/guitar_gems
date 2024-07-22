import './Heading.css';

export function HeadingLarge({ text, theme = 'light' }) {
	return <h1 className={`heading-large ${theme}`}>{text}</h1>;
}

export function HeadingMedium({ text, theme = 'light' }) {
	return <h2 className={`heading-medium ${theme}`}>{text}</h2>;
}

export function HeadingSmall({ text, theme = 'light' }) {
	return <h3 className={`heading-small ${theme}`}>{text}</h3>;
}
