import { Link } from 'react-aria-components';
import './header.css';

export default function Header() {
    return (
        <header>
            <Link href="#">
                <span className="material-symbols-outlined">account_circle</span>
                Sign In
            </Link>
        </header>
    );
}