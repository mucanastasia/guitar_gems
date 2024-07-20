import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import Spinner from '../../spinner/Spinner';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				console.log('session onAuthStateChange: ', session);
				setSession(session);
				setUser(session?.user || null);
				setLoading(false);
			}
		);
		return () => {
			listener?.subscription.unsubscribe();
		};
	}, []);

	return (
		<SessionContext.Provider value={{ user, session }}>
			{!loading ? children : <Spinner />}
		</SessionContext.Provider>
	);
};

export default SessionProvider;
