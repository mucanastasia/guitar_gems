import { useMutation } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useHistory, useLocation } from 'react-router-dom';
import { ROOT_PATH } from '@features/router/constants/routePaths';

const signUp = async ({ name, email, password }) => {
	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				name: name,
			},
		},
	});
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const useSignUp = () => {
	const history = useHistory();
	const location = useLocation();
	const { from } = location.state || { from: { pathname: ROOT_PATH } };

	return useMutation({
		mutationFn: signUp,
		onSuccess: () => {
			history.replace(from);
		},
	});
};
