import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';

const deleteFavourites = async ({ favoriteId }) => {
	const { error } = await supabase.from('favourites').delete().eq('id', favoriteId);
	if (error) {
		console.error(error.message);
	}
};

export const useDeleteFavourites = () => {
	const queryClient = useQueryClient();
	const { data: user } = useUser();

	return useMutation({
		mutationKey: ['deleteFavourites'],
		mutationFn: ({ favoriteId }) => {
			deleteFavourites({ favoriteId });
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries(['guitars']);
			queryClient.invalidateQueries(['guitarData', variables.favoriteId, user?.id]);
		},
	});
};
