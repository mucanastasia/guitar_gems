import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { CARDS_PER_PAGE } from '@features/catalogue/constants/catalogue';
import { useUser } from '@api/useUser';

const fetchFavourites = async ({ pageParam = 0 }) => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	const { data, error } = await supabase
		.from('searchable_guitars')
		.select('id, name, main_img, brand_name, is_favourite')
		.order('id', { ascending: true })
		.gt('id', pageParam)
		.eq('is_favourite', true)
		.limit(CARDS_PER_PAGE);

	if (error) throw new Error(error.message);

	return data;
};

export const useFavourites = () => {
	const { data: user, isPending } = useUser();
	const userId = user?.id || 'guest';

	return useInfiniteQuery({
		queryKey: ['favourites_page', userId],
		queryFn: fetchFavourites,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (lastPage.length < CARDS_PER_PAGE) {
				return undefined;
			}
			return lastPage[lastPage.length - 1].id;
		},
		enabled: !!user?.id && !isPending,
	});
};
