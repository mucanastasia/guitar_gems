import { useState } from 'react';
import { supabase } from '@api/supabaseClient';
import { DialogTrigger } from 'react-aria-components';
import { SignOutProvider } from '../contexts/SignOutContext';

export function SignOutTriggerContainer({ children }) {
	const [loading, setLoading] = useState();

	const handleSignOut = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
		setLoading(false);
	};

	return (
		<DialogTrigger>
			<SignOutProvider loading={loading} handleSignOut={handleSignOut}>
				{children}
			</SignOutProvider>
		</DialogTrigger>
	);
}
