import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useHistory, useLocation } from 'react-router-dom';
import { ROOT_PATH } from '@features/router/constants/routePaths';

const signIn = async ({ email, password }) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const useSignIn = () => {
	const history = useHistory();
	const location = useLocation();
	const { from } = location.state || { from: { pathname: ROOT_PATH } };
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['signIn'],
		mutationFn: signIn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
			setTimeout(() => {
				history.replace(from);
			}, 400);
		},
	});
};
