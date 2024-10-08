import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useHistory } from 'react-router-dom';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { useUser } from '@api/useUser';
import toast from 'react-hot-toast';

const editGuitar = async ({ filteredData, id }) => {
	const { error } = await supabase.from('guitars').update(filteredData).eq('id', id);
	if (error) {
		throw new Error(error.message);
	}
	await new Promise((resolve) => setTimeout(resolve, 300));
};

export const useEditGuitar = (id) => {
	const history = useHistory();
	const queryClient = useQueryClient();
	const { data: user } = useUser();

	return useMutation({
		mutationKey: ['editGuitar'],
		mutationFn: editGuitar,
		onSuccess: (_data, variables) => {
			queryClient.refetchQueries({
				queryKey: ['favourites_page', user?.id],
			});
			queryClient.refetchQueries({
				queryKey: ['guitars'],
			});
			queryClient.refetchQueries({
				queryKey: ['data_guitar', variables.id],
			});
			queryClient.invalidateQueries({
				queryKey: ['editable_guitar', variables.id],
			});
			history.push(`${GUITAR_PATH_DIR}${id}`);
			toast.success('Changes saved successfully!');
		},
		onError: (err) => {
			toast.error(`Failed to save changes: ${err.message}`);
		},
	});
};
