import { useSession } from '@features/auth/contexts/SessionContext';
import { useLocation } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import { useState } from 'react';
import { supabase } from '@api/supabaseClient';

export function NavigationContainer() {
	const { session, user } = useSession();
	const location = useLocation();
	const currentPath = location.pathname;

	const [loading, setLoading] = useState();

	const handleSignOut = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
		setLoading(false);
	};

	const props = {
		isLoggedIn: session !== null,
		isUserEditor: user?.app_metadata.role === 'editor',
		userName: user?.user_metadata.name,
		currentPath,
		loading,
		handleSignOut,
	};

	return <Navigation {...props} />;
}
