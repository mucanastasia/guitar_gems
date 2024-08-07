import { useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const getUser = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
};

export const useUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	});
};
