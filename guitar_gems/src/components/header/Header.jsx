import { Button } from 'react-aria-components';
import './styles/header.css';

export default function Header() {
    return (
        <header>
            <Button>
                <span className="material-symbols-outlined">account_circle</span>
                <p>Sign In</p>
            </Button>
        </header>
    );
}