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
		mutationFn: async ({ guitarId }) => {
			return await deleteFavourites({ guitarId, userId: user?.id });
		},
		onMutate: async (variables) => {
			const previousFavourites = queryClient.getQueryData([
				'list_of_favourites',
				user?.id,
			]);
			const previousGuitarData = queryClient.getQueryData([
				'data_guitar',
				variables.guitarId,
			]);

			if (previousFavourites) {
				queryClient.setQueryData(
					['list_of_favourites', user?.id],
					new Set([...previousFavourites].filter((id) => id !== variables.guitarId))
				);
			}
			if (previousGuitarData) {
				queryClient.setQueryData(['data_guitar', variables.guitarId], {
					...previousGuitarData,
					isFavourite: false,
				});
			}
			return { previousFavourites, previousGuitarData };
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['favourites_page', user?.id],
			});
		},
		onError: (error, variables, context) => {
			queryClient.setQueryData(
				['list_of_favourites', user?.id],
				context.previousFavourites
			);
			queryClient.setQueryData(
				['data_guitar', variables.guitarId],
				context.previousGuitarData
			);
			console.error('Error deleting from favourites:', error.message);
		},
		onSettled: (_data, _error, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['list_of_favourites', user?.id],
				refetchType: 'inactive',
			});
			queryClient.invalidateQueries({
				queryKey: ['data_guitar', variables.guitarId],
				refetchType: 'inactive',
			});
		},
	});
};
