import { Route, Redirect } from 'react-router-dom';
import { SIGN_IN_PATH } from '@features/router/constants/routePaths';
import { useUser } from '@api/useUser';

export function PrivateRouteContainer({ children, ...rest }) {
	const { data: user } = useUser();

	return (
		<Route
			{...rest}
			render={({ location }) =>
				user ? (
					children
				) : (
					<Redirect
						to={{
							pathname: SIGN_IN_PATH,
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}
