import { Text } from '@ui/text';
import { ROOT_PATH, FAVOURITES_PATH } from '@features/router/constants/routePaths';
import { LinkAuth } from '@ui/link';
import './EmptyCompare.css';

export function EmptyCompare({ isLoggedIn }) {
	return (
		<div className="empty-content">
			<Text size="large">{`You haven't added any guitars to compare yet!`}</Text>
			<Text size="small">
				{isLoggedIn && (
					<>
						<LinkAuth path={FAVOURITES_PATH} name="Go to my picks" />
						{' or '}
					</>
				)}
				<LinkAuth path={ROOT_PATH} name="Explore the catalogue" />
			</Text>
		</div>
	);
}
