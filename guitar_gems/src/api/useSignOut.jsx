import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) console.error(error);
};

export const useSignOut = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['signOut'],
		mutationFn: signOut,
		onSuccess: () => {
			queryClient.invalidateQueries(['user']);
		},
	});
};

const { error } = await supabase.auth.signOut();
if (error) console.error(error);
