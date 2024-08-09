import { useLocation } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import { useUser } from '@api/useUser';
import { useSignOut } from '@api/useSignOut';
import { useTheme } from '@helpers/ThemeContext';

export function NavigationContainer() {
	const location = useLocation();
	const currentPath = location.pathname;

	const { data: user } = useUser();
	const { mutate, isPending } = useSignOut();

	const handleSignOut = async () => {
		await mutate();
	};

	const { theme, toggleTheme } = useTheme();

	const props = {
		isLoggedIn: user !== null,
		isUserEditor: user?.app_metadata.role === 'editor',
		userName: user?.user_metadata.name,
		currentPath,
		loading: isPending,
		handleSignOut,
		theme,
		toggleTheme,
	};

	return <Navigation {...props} />;
}
