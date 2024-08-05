import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useHistory } from 'react-router-dom';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import { useUser } from '@api/useUser';

const deleteGuitar = async ({ id }) => {
	const { error } = await supabase.from('guitars').delete().eq('id', id);
	if (error) {
		console.error(error.message);
	}
	await new Promise((resolve) => setTimeout(resolve, 300));
};

export const useDeleteGuitar = () => {
	const history = useHistory();
	const queryClient = useQueryClient();
	const { data: user } = useUser();

	return useMutation({
		mutationKey: ['deleteGuitar'],
		mutationFn: deleteGuitar,
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['guitars'],
			});
			queryClient.invalidateQueries({
				queryKey: ['favourites', user?.id],
			});
			queryClient.removeQueries({
				queryKey: ['data_guitar', variables.id],
			});
			queryClient.removeQueries({
				queryKey: ['editable_guitar', variables.id],
			});
			history.push(ROOT_PATH);
		},
	});
};
