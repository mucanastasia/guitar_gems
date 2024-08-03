import { Link } from '@ui/link';
import {
	SIGN_IN_PATH,
	ADD_GUITAR_PATH,
	FAVOURITES_PATH,
} from '@features/router/constants/routePaths';
import { DialogTrigger } from 'react-aria-components';
import { Popover } from '@ui/popover';
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
					<Link name="My picks" path={FAVOURITES_PATH} icon="favorite" />

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
