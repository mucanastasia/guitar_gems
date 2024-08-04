import { useMutation } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useHistory } from 'react-router-dom';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';

const addGuitar = async ({ filteredData }) => {
	const { data: responseData, error } = await supabase
		.from('guitars')
		.insert([filteredData])
		.select('id');
	if (error) {
		throw error;
	}
	await new Promise((resolve) => setTimeout(resolve, 300));
	return responseData;
};

export const useAddGuitar = () => {
	const history = useHistory();

	return useMutation({
		mutationKey: ['addGuitar'],
		mutationFn: addGuitar,
		onSuccess: (responseData) => {
			history.push(`${GUITAR_PATH_DIR}${responseData[0].id}`);
		},
	});
};
