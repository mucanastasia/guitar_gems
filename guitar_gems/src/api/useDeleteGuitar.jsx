import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useHistory } from 'react-router-dom';
import { ROOT_PATH } from '@features/router/constants/routePaths';

const deleteGuitar = async ({ id }) => {
	const { error } = await supabase.from('guitars').delete().eq('id', id);
	if (error) {
		console.error(error.message);
	}
	await new Promise((resolve) => setTimeout(resolve, 300));
};

export const useDeleteGuitar = (id) => {
	const history = useHistory();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['editGuitar'],
		mutationFn: deleteGuitar,
		onSuccess: () => {
			history.push(ROOT_PATH);
			queryClient.removeQueries(['editableGuitar', id]);
			queryClient.removeQueries(['guitarData', id]);
			queryClient.invalidateQueries(['guitars']);
		},
	});
};
