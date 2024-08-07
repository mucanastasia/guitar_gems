import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';

const addToFavourites = async ({ guitarId, userId }) => {
	// await new Promise((resolve) => setTimeout(resolve, 400));
	const { data, error } = await supabase
		.from('favourites')
		.upsert([{ user_id: userId, guitar_id: guitarId }])
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
		mutationFn: async ({ guitarId }) => {
			return await addToFavourites({ guitarId, userId: user.id });
		},
		onMutate: async (variables) => {
			const previousGuitarData = queryClient.getQueryData([
				'data_guitar',
				variables.guitarId,
			]);
			const previousFavourites = queryClient.getQueryData([
				'list_of_favourites',
				user?.id,
			]);

			if (previousFavourites) {
				queryClient.setQueryData(
					['list_of_favourites', user?.id],
					new Set([...previousFavourites, variables.guitarId])
				);
			}
			if (previousGuitarData) {
				queryClient.setQueryData(['data_guitar', variables.guitarId], {
					...previousGuitarData,
					isFavourite: true,
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
			console.error('Error adding to favourites:', error.message);
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
