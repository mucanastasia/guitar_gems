import { Route, Redirect } from 'react-router-dom';
import { SIGN_IN_PATH } from '../constants/routePaths';
import { useUser } from '@api/useUser';
import { Spinner } from '@ui/spinner';

export function PrivateRouteContainer({ children, ...rest }) {
	const { data: user, isPending } = useUser();

	return (
		<Route
			{...rest}
			render={({ location }) =>
				isPending ? (
					<Spinner />
				) : user ? (
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
