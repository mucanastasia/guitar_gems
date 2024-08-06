import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';

const addToFavourites = async ({ guitarId, userId }) => {
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
		mutationFn: ({ guitarId }) => {
			addToFavourites({ guitarId, userId: user.id });
		},
		onMutate: async (variables) => {
			queryClient.setQueryData(['data_guitar', variables.guitarId], (oldData) => {
				if (oldData) {
					return {
						...oldData,
						isFavourite: true,
					};
				}
				return oldData;
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['guitars'],
			});
			queryClient.invalidateQueries({
				queryKey: ['favourites'],
			});
		},
		onError: (error, variables) => {
			queryClient.setQueryData(['data_guitar', variables.guitarId], (oldData) => {
				if (oldData) {
					return {
						...oldData,
						isFavourite: false,
					};
				}
				return oldData;
			});
			console.error('Error adding to favourites:', error.message);
		},
	});
};
