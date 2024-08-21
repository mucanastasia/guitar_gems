import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { removeComparisonFromLS } from '@features/comparison/helpers/localstorageCompare';

const signOut = async () => {
	await supabase.auth.signOut();
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
			removeComparisonFromLS();
		},
	});
};
