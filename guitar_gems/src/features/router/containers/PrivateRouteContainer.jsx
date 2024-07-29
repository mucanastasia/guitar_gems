import { Route, Redirect } from 'react-router-dom';
import { useSession } from '@features/auth/contexts/SessionContext';
import { SIGN_IN_PATH } from '@features/router/constants/routePaths';

export function PrivateRouteContainer({ children, ...rest }) {
	const { user } = useSession();

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
