import './Text.css';

export function Text({ children, size }) {
	return <p className={`text-${size}`}>{children}</p>;
}
