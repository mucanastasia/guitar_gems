import './TextError.css';

export function TextError({ children: error }) {
	return <span className="error-general">{error && error}</span>;
}
