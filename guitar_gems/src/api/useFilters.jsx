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
		queryKey: ['brands_filters'],
		queryFn: () => fetchFilters('brands'),
		gcTime: 3600000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	const typesQuery = useQuery({
		queryKey: ['guitar_types_filters'],
		queryFn: () => fetchFilters('guitar_types'),
		gcTime: 3600000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	const materialsQuery = useQuery({
		queryKey: ['materials_filters'],
		queryFn: () => fetchFilters('materials'),
		gcTime: 3600000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
	const countriesQuery = useQuery({
		queryKey: ['countries_filters'],
		queryFn: () => fetchFilters('countries'),
		gcTime: 3600000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
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
