import { useRouteMatch } from 'react-router-dom';
import { SIGN_IN_PATH, SIGN_UP_PATH } from '@features/router/constants/routePaths';
import { AppLayout } from '@features/router/components/app-layout';

export function AppLayoutContainer({ children }) {
	const isOnAuthPage = Boolean(useRouteMatch([SIGN_IN_PATH, SIGN_UP_PATH]));

	return (
		<AppLayout shouldShowHeader={!isOnAuthPage} shouldShowFooter={!isOnAuthPage}>
			{children}
		</AppLayout>
	);
}
