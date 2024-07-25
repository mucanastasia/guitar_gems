import { Popover } from '@ui/popover';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import './SignOutPopover.css';

export function SignOutPopover({ loading, handleSignOut }) {
	return (
		<Popover>
			<Button state="accent" onClick={handleSignOut}>
				<Icon color="white" name="logout" />
				{loading ? 'Loading...' : 'Sign Out'}
			</Button>
		</Popover>
	);
}
