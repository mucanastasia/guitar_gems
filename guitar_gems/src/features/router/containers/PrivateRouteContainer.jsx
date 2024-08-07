import { Route, Redirect } from 'react-router-dom';
import { SIGN_IN_PATH } from '../constants/routePaths';
import { useQueryClient } from '@tanstack/react-query';

export function PrivateRouteContainer({ children, ...rest }) {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData(['user']);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				user ? (
					<>
						{/* {console.log('user', user)} */}
						{children}
					</>
				) : (
					<>
						{/* {console.log('redirect', user)} */}
						<Redirect
							to={{
								pathname: SIGN_IN_PATH,
								state: { from: location.pathname },
							}}
						/>
					</>
				)
			}
		/>
	);
}
