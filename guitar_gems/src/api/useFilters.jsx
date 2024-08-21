import { useQueries } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const fetchFilters = async (tableName) => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	const { data, error } = await supabase.from(tableName).select(`id, name`);
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

const filters = ['brands', 'guitar_types', 'materials', 'countries'];

export const useFilters = () => {
	const filtersQueries = useQueries({
		queries: filters.map((tableName) => ({
			queryKey: [`${tableName}_filters`],
			queryFn: () => fetchFilters(tableName),
			gcTime: 3600000,
			staleTime: Infinity,
		})),
		combine: (results) => {
			const data = {};
			results.forEach((result, index) => {
				const key = filters[index] === 'guitar_types' ? 'types' : filters[index];
				data[key] = result.data;
			});
			return {
				data,
				isPending: results.some((result) => result.isPending),
			};
		},
	});

	return filtersQueries;
};
