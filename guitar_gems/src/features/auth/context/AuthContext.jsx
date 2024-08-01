import { createContext, useEffect, useContext } from 'react';
import { supabase } from '@api/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(async (event) => {
			if (event === 'SIGNED_OUT' || event === 'SIGNED_IN') {
				queryClient.invalidateQueries(['user']);
			}
		});

		return () => {
			listener?.subscription.unsubscribe();
		};
	}, [queryClient]);

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
