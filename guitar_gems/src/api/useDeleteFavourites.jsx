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
		onMutate: async (variables) => {
			queryClient.setQueryData(['data_guitar', variables.guitarId], (oldData) => {
				if (oldData) {
					return {
						...oldData,
						isFavourite: false,
					};
				}
				return oldData;
			});
			// queryClient.setQueryData(['favourites', user?.id], (oldData) => {
			// 	if (oldData) {
			// 		console.log(oldData?.pages[oldData?.pageParams.length - 1]);
			// 		// return;
			// 		return oldData?.pages[oldData?.pageParams.length - 1].filter(
			// 			(item) => item.id !== variables.guitarId
			// 		);
			// 	}
			// 	return;
			// });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['favourites', user?.id],
			});
			queryClient.invalidateQueries({
				queryKey: ['guitars'],
			});
		},
		onError: (error, variables) => {
			queryClient.setQueryData(['data_guitar', variables.guitarId], (oldData) => {
				if (oldData) {
					return {
						...oldData,
						isFavourite: true,
					};
				}
				return oldData;
			});
			console.error('Error deleting from favourites:', error.message);
		},
	});
};
