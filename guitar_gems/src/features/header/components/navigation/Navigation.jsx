import { Link } from '@ui/link';
import { SIGN_IN_PATH, ADD_GUITAR_PATH } from '@features/router/constants/routePaths';
import { SignOutTriggerContainer, SignOutPopoverContainer } from '../../containers';
import './Navigation.css';

export function Navigation({ isLoggedIn, isEditor, userName, currentPath }) {
	return (
		<nav>
			{isEditor && <Link name="Add guitar" path={ADD_GUITAR_PATH} icon="add_circle" />}

			{isLoggedIn ? (
				<SignOutTriggerContainer>
					<Link name={userName} icon="account_circle" />
					<SignOutPopoverContainer />
				</SignOutTriggerContainer>
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
