import { SignOutPopover } from '../components/sign-out-popover/SignOutPopover';
import { useSignOut } from '../contexts/SignOutContext';

export function SignOutPopoverContainer() {
	const { loading, handleSignOut } = useSignOut();

	return <SignOutPopover loading={loading} handleSignOut={handleSignOut} />;
}
