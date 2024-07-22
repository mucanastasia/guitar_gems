import { useState } from 'react';
import { Button, DialogTrigger } from 'react-aria-components';
import { useSession } from '../auth/contexts/SessionContext';
import { supabase } from '@api/supabaseClient';
import './styles/header.css';
import { useLocation } from 'react-router-dom';
import { Logo, HeaderLink } from '@ui/header-link';
import { PopOver } from '@ui/popover';

export default function Header() {
	const { session } = useSession();
	const [loading, setLoading] = useState();
	const location = useLocation();

	const handleSignOut = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signOut();
		console.log(error);
		setLoading(false);
	};

	return (
		<header>
			<Logo path="/" />

			<nav>
				{session?.user.app_metadata.role === 'editor' && (
					<HeaderLink name="Add guitar" path="/editor/add-new-guitar" icon="add_circle" />
				)}

				{session ? (
					<DialogTrigger>
						<HeaderLink name={session.user.user_metadata.name} icon="account_circle" />
						{/* TODO: SignOutTrigger with context and etc */}
						<PopOver>
							<Button onPress={handleSignOut}>
								<span className="material-symbols-outlined">logout</span>
								<p>{loading ? 'Loading...' : 'Sign Out'}</p>
							</Button>
						</PopOver>
					</DialogTrigger>
				) : (
					<HeaderLink
						name="Sign In"
						path={{ pathname: '/sign-in', state: { from: location.pathname } }}
						icon="login"
					/>
				)}
			</nav>
		</header>
	);
}
