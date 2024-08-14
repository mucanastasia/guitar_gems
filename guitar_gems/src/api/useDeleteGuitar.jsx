import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';
import { useRouteMatch } from 'react-router-dom';
import { GUITAR_PATH } from '@features/router/constants/routePaths';

const deleteGuitar = async ({ id }) => {
	const { error } = await supabase.from('guitars').delete().eq('id', id);
	if (error) {
		console.error(error.message);
	}
	await new Promise((resolve) => setTimeout(resolve, 300));
};

export const useDeleteGuitar = () => {
	const queryClient = useQueryClient();
	const { data: user } = useUser();
	const isGuitarPage = Boolean(useRouteMatch(GUITAR_PATH));

	return useMutation({
		mutationKey: ['deleteGuitar'],
		mutationFn: deleteGuitar,
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['guitars'],
			});
			isGuitarPage &&
				queryClient.refetchQueries({
					queryKey: ['guitars'],
				});
			queryClient.refetchQueries({
				queryKey: ['favourites_page', user?.id],
			});
			queryClient.removeQueries({
				queryKey: ['data_guitar', variables.id],
			});
			queryClient.removeQueries({
				queryKey: ['editable_guitar', variables.id],
			});
		},
	});
};
