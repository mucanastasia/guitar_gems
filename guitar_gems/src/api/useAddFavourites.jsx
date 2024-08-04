import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';

const addToFavourites = async ({ guitarId, userId }) => {
	const { data, error } = await supabase
		.from('favourites')
		.insert([{ user_id: userId, guitar_id: guitarId }])
		.select('id');
	if (error) {
		throw error;
	}
	return data;
};

export const useAddFavourites = () => {
	const queryClient = useQueryClient();
	const { data: user } = useUser();

	return useMutation({
		mutationKey: ['addFavourites'],
		mutationFn: ({ guitarId }) => {
			addToFavourites({ guitarId, userId: user.id });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['guitars'],
			});
		},
		onError: (error) => {
			console.error('Error adding to favourites:', error.message);
		},
	});
};
