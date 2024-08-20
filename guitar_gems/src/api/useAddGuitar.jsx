import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useHistory } from 'react-router-dom';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import toast from 'react-hot-toast';

const addGuitar = async ({ filteredData }) => {
	const { data: responseData, error } = await supabase
		.from('guitars')
		.insert([filteredData])
		.select('id');
	if (error) {
		throw error;
	}
	return responseData;
};

export const useAddGuitar = () => {
	const history = useHistory();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['addGuitar'],
		mutationFn: addGuitar,
		onSuccess: (responseData) => {
			queryClient.refetchQueries({
				queryKey: ['guitars'],
			});
			history.push(`${GUITAR_PATH_DIR}${responseData[0].id}`);
			toast.success('Successfully published');
		},
		onError: (err) => {
			toast.error(`Failed to publish: ${err.message}`);
		},
	});
};
