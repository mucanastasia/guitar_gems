import guitar from '@assets/guitar.webp';
import './styles/auth.css';

export default function AuthPage({ children }) {
	return (
		<div className="auth-container">
			<div className="img-guitar" style={{ backgroundImage: `url(${guitar})` }}></div>
			{children}
		</div>
	);
}
