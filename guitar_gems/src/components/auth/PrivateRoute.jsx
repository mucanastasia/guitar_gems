import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';

export default function PrivateRoute({ children, ...rest }) {
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
                            pathname: "/guitar_gems/sign-in",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}