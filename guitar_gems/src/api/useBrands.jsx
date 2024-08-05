import { useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const fetchBrands = async () => {
	const { data, error } = await supabase.from('brands').select(`id,name`);
	if (error) throw new Error(error.message);
	return data;
};

export const useBrands = () => {
	return useQuery({
		queryKey: ['brands'],
		queryFn: fetchBrands,
		gcTime: 3600000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
};
