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
			queryClient.removeQueries({ queryKey: ['user'] });
			queryClient.removeQueries({ queryKey: ['list_of_favourites'] });
			queryClient.removeQueries({ queryKey: ['favourites_page'] });
			queryClient.removeQueries({ queryKey: ['guitars'] });
			queryClient.removeQueries({ queryKey: ['data_guitar'] });
			queryClient.removeQueries({ queryKey: ['editable_guitar'] });
		},
	});
};
