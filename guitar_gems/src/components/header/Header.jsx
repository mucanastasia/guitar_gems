import { useState } from 'react';
import { DialogTrigger } from 'react-aria-components';
import { useSession } from '../auth/contexts/SessionContext';
import { supabase } from '@api/supabaseClient';
import { useLocation } from 'react-router-dom';
import { Logo, Link } from '@ui/link';
import { Popover } from '@ui/popover';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import './styles/header.css';

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
					<Link name="Add guitar" path="/editor/add-new-guitar" icon="add_circle" />
				)}

				{session ? (
					<DialogTrigger>
						<Link name={session.user.user_metadata.name} icon="account_circle" />
						{/* TODO: SignOutTrigger with context and etc */}
						<Popover>
							<Button state="accent" onClick={handleSignOut}>
								<Icon color="white" name="logout" />
								{loading ? 'Loading...' : 'Sign Out'}
							</Button>
						</Popover>
					</DialogTrigger>
				) : (
					<Link
						name="Sign In"
						path={{ pathname: '/sign-in', state: { from: location.pathname } }}
						icon="login"
					/>
				)}
			</nav>
		</header>
	);
}
