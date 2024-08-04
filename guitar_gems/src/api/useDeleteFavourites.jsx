import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';

const deleteFavourites = async ({ guitarId, userId }) => {
	const { data, error } = await supabase
		.from('favourites')
		.delete()
		.eq('guitar_id', guitarId)
		.eq('user_id', userId)
		.select('guitar_id');
	if (error) {
		console.error(error.message);
	}
	return data;
};

export const useDeleteFavourites = () => {
	const queryClient = useQueryClient();
	const { data: user } = useUser();

	return useMutation({
		mutationKey: ['deleteFavourites'],
		mutationFn: ({ guitarId }) => {
			deleteFavourites({ guitarId, userId: user?.id });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['favourites'],
			});
		},
	});
};
