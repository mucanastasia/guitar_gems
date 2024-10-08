import { useHistory } from 'react-router-dom';
import { EDIT_GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { Button } from '@ui/button';
import { IconButton } from '@ui/icon';
import { Popover } from '@ui/popover';
import { Text } from '@ui/text';
import { DialogTrigger } from 'react-aria-components';
import { useUser } from '@api/useUser';
import { useDeleteGuitar } from '@api/useDeleteGuitar';
import { useLocation } from 'react-router-dom';
import { useScrollRestoration } from '@helpers/useScrollRestoration';

export function EditorActionsContainer({ guitarId }) {
	const { data: user } = useUser();
	const isUserEditor = user?.app_metadata.role === 'editor';

	const { mutate, isPending } = useDeleteGuitar();

	const history = useHistory();
	const location = useLocation();

	const { saveScrollPosition } = useScrollRestoration();

	const editGuitar = (guitarId) => {
		if (isUserEditor) {
			history.push({
				pathname: `${EDIT_GUITAR_PATH_DIR}${guitarId}`,
				state: { from: location.pathname },
			});
			saveScrollPosition();
			return;
		}
		return null;
	};

	const deleteGuitar = async (guitarId) => {
		await mutate({ id: guitarId });
	};

	if (!isUserEditor) {
		return null;
	}

	return (
		<>
			<IconButton
				name="stylus"
				size="medium"
				className="material-symbols-outlined outlined"
				onClick={() => {
					editGuitar(guitarId);
				}}
			/>
			<DialogTrigger>
				<IconButton
					name="delete"
					size="medium"
					className="material-symbols-outlined outlined"
				/>
				<Popover>
					<Text size="xsmall">Are you sure you want to delete this guitar?</Text>
					<Button
						state="danger"
						onClick={() => deleteGuitar(guitarId)}
						disabled={isPending}>
						{isPending ? 'Deleting...' : 'Yes, delete'}
					</Button>
				</Popover>
			</DialogTrigger>
		</>
	);
}
