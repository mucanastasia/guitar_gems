import { useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const fetchFilters = async (tableName) => {
	await new Promise((resolve) => setTimeout(resolve, 400));

	const { data, error } = await supabase.from(tableName).select(`id, name`);
	if (error) console.error(error.message);
	return data;
};

export const useFilters = () => {
	const brandsQuery = useQuery({
		queryKey: ['brands'],
		queryFn: () => fetchFilters('brands'),
	});
	const typesQuery = useQuery({
		queryKey: ['guitar_types'],
		queryFn: () => fetchFilters('guitar_types'),
	});
	const materialsQuery = useQuery({
		queryKey: ['materials'],
		queryFn: () => fetchFilters('materials'),
	});
	const countriesQuery = useQuery({
		queryKey: ['countries'],
		queryFn: () => fetchFilters('countries'),
	});

	const isPending =
		brandsQuery.isPending ||
		typesQuery.isPending ||
		materialsQuery.isPending ||
		countriesQuery.isPending;

	const data = {
		brands: brandsQuery.data || [],
		types: typesQuery.data || [],
		materials: materialsQuery.data || [],
		countries: countriesQuery.data || [],
	};

	return { data, isPending };
};
