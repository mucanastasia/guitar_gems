import { useSession } from '../../../components/auth/contexts/SessionContext'; //SESSION CONTEXT
import { useLocation } from 'react-router-dom';
import { Navigation } from '../components/navigation';

export function NavigationContainer() {
	const { session, user } = useSession();
	const location = useLocation();
	const currentPath = location.pathname;

	const isLoggedIn = session !== null;
	const isUserEditor = isLoggedIn && user.app_metadata.role === 'editor';

	return (
		<Navigation
			isLoggedIn={isLoggedIn}
			isUserEditor={isUserEditor}
			userName={user?.user_metadata.name}
			currentPath={currentPath}
		/>
	);
}
