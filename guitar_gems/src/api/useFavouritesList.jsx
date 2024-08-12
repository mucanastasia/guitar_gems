import { useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';

const getFavourites = async (userId) => {
	const { data, error } = await supabase
		.from('favourites')
		.select('guitar_id')
		.eq('user_id', userId);

	if (error) throw new Error(error.message);

	const favourites = new Set(data.map((item) => item.guitar_id));

	return favourites;
};

export const useFavouritesList = () => {
	const { data: user } = useUser();
	const userId = user?.id || 'guest';

	return useQuery({
		queryKey: ['list_of_favourites', userId],
		queryFn: () => getFavourites(user?.id),
		enabled: !!user?.id,
	});
};
