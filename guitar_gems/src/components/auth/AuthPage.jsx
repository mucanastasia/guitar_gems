import guitar from './assets/guitar.jpg';
import './styles/auth.css';

export default function AuthPage({ children }) {

    return (
        <div className="auth-container">
            <div className="img-guitar" style={{ backgroundImage: `url(${guitar})` }} ></div>
            {children}
        </div>
    );
}