import './Heading.css';

export function HeadingLarge({ text }) {
	return <h1 className="heading-large">{text}</h1>;
}

export function HeadingMedium({ text }) {
	return <h2 className="heading-medium">{text}</h2>;
}

export function HeadingSmall({ text }) {
	return <h3 className="heading-small">{text}</h3>;
}
