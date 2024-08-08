import { createContext, useEffect, useContext, useState } from 'react';
import { supabase } from '@api/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const [authStatus, setAuthStatus] = useState(null);

	useEffect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(async (event) => {
			if (event === 'SIGNED_IN') {
				if (authStatus !== 'signed_in') {
					setAuthStatus('signed_in');
					queryClient.invalidateQueries({
						queryKey: ['user'],
						refetchType: 'active',
					});
				}
			} else if (event === 'SIGNED_OUT') {
				if (authStatus !== 'signed_out') {
					setAuthStatus('signed_out');
					queryClient.invalidateQueries({
						queryKey: ['user'],
						refetchType: 'active',
					});
				}
			}
		});

		return () => {
			listener?.subscription.unsubscribe();
		};
	}, [queryClient, authStatus]);

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
