import { useMutation } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useHistory } from 'react-router-dom';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';

const editGuitar = async ({ filteredData, id }) => {
	const { error } = await supabase.from('guitars').update(filteredData).eq('id', id);
	if (error) {
		throw new Error(error.message);
	}
	await new Promise((resolve) => setTimeout(resolve, 300));
};

export const useEditGuitar = (id) => {
	const history = useHistory();

	return useMutation({
		mutationKey: ['editGuitar'],
		mutationFn: editGuitar,
		onSuccess: () => {
			history.push(`${GUITAR_PATH_DIR}${id}`);
		},
	});
};
