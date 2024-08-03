import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { CARDS_PER_PAGE } from '@features/catalogue/constants/catalogue';
import { prepareFilter } from '@features/catalogue/helpers/filterHelpers';

const fetchGuitars = async ({ pageParam = 0, queryKey }) => {
	await new Promise((resolve) => setTimeout(resolve, 400));
	const filters = queryKey[1];

	let request = supabase
		.from('searchable_guitars')
		.select('id, name, main_img, brand_name')
		.order('id', { ascending: true })
		.gt('id', pageParam)
		.limit(CARDS_PER_PAGE);

	if (filters.brands.length > 0) {
		request = request.or(prepareFilter(filters.brands, ['brand_id']));
	}
	if (filters.types.length > 0) {
		request = request.or(prepareFilter(filters.types, ['type_id']));
	}
	if (filters.materials.length > 0) {
		request = request.or(
			prepareFilter(filters.materials, [
				'body_material_id',
				'neck_material_id',
				'fingerboard_material_id',
			])
		);
	}
	if (filters.countries.length > 0) {
		request = request.or(prepareFilter(filters.countries, ['country_id']));
	}
	if (filters.date.start && filters.date.end) {
		request.gte('release_date', filters.date.start.toLocaleString('en-GB'));
		request.lte('release_date', filters.date.end.toLocaleString('en-GB'));
	}
	if (filters.query.length > 0) {
		request = request.or(
			`name.ilike.%${filters.query}%,full_text_search.wfts.${filters.query},brand_name.ilike.%${filters.query}%,type_name.ilike.%${filters.query}%,body_material_name.ilike.%${filters.query}%,neck_material_name.ilike.%${filters.query}%,fingerboard_material_name.ilike.%${filters.query}%,country_name.ilike.%${filters.query}%`
		);
	}

	const { data, error } = await request;

	if (error) throw new Error(error.message);

	return data;
};

export const useGuitars = (selectedFilters) => {
	return useInfiniteQuery({
		queryKey: ['guitars', selectedFilters],
		queryFn: fetchGuitars,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (lastPage.length < CARDS_PER_PAGE) {
				return undefined;
			}
			return lastPage[lastPage.length - 1].id;
		},
		retry: 1,
	});
};
