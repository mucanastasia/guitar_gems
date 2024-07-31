import { Link } from '@ui/link';
import { SIGN_IN_PATH, ADD_GUITAR_PATH } from '@features/router/constants/routePaths';
import { DialogTrigger, Popover } from 'react-aria-components';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import './Navigation.css';

export function Navigation({ ...props }) {
	const { isLoggedIn, isUserEditor, userName, currentPath, loading, handleSignOut } =
		props;

	return (
		<nav>
			{isUserEditor && (
				<Link name="Add guitar" path={ADD_GUITAR_PATH} icon="add_circle" />
			)}

			{isLoggedIn ? (
				<>
					<DialogTrigger>
						<Link name={userName} icon="account_circle" />
						<Popover>
							<Button state="accent" onClick={handleSignOut}>
								<Icon color="white" name="logout" />
								{loading ? 'Loading...' : 'Sign Out'}
							</Button>
						</Popover>
					</DialogTrigger>
				</>
			) : (
				<Link
					name="Sign In"
					path={{ pathname: SIGN_IN_PATH, state: { from: currentPath } }}
					icon="login"
				/>
			)}
		</nav>
	);
}
