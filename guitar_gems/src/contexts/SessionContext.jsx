import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Spinner from '../components/spinner/Spinner';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscription = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null);
                    setUser(null);
                } else if (session) {
                    setSession(session);
                    setUser(session?.user);
                    setLoading(false);
                }
                console.log('Session: ', session);
            });

        return () => {
            subscription.data.subscription.unsubscribe();
        }
    }, []);

    return (
        <SessionContext.Provider value={{ user, session }}>
            {!loading ? children : <Spinner />}
        </SessionContext.Provider>
    );
};

export default SessionProvider;