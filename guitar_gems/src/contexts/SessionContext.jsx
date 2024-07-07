import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const subscription = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null);
                } else if (session) {
                    setSession(session);
                }
                console.log('Session: ', session);
            });

        return () => {
            subscription.data.subscription.unsubscribe();
        }
    }, []);

    return (
        <SessionContext.Provider value={{ session }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);