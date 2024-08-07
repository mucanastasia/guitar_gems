import { useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const getUser = async () => {
	console.log('starting getUser');
	const {
		data: { user },
	} = await supabase.auth.getUser();
	console.log('finishing getUser', user);
	return user;
};

export const useUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	});
};
