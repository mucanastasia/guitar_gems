import './Text.css';

export function Text({ children, size, theme = 'light' }) {
	return <p className={`text-${size} ${theme}`}>{children}</p>;
}
