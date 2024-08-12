import { useHistory } from 'react-router-dom';
import { EDIT_GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { Button } from '@ui/button';
import { Button as AriaButton } from 'react-aria-components';
import { Popover } from '@ui/popover';
import { Text } from '@ui/text';
import { DialogTrigger } from 'react-aria-components';
import { useUser } from '@api/useUser';
import { useDeleteGuitar } from '@api/useDeleteGuitar';
import { useLocation } from 'react-router-dom';

export function EditorActionsContainer({ guitarId, saveScrollPosition }) {
	const { data: user } = useUser();
	const isUserEditor = user?.app_metadata.role === 'editor';

	const { mutate, isPending } = useDeleteGuitar();

	const history = useHistory();
	const location = useLocation();

	const editGuitar = (guitarId) => {
		if (isUserEditor) {
			history.push({
				pathname: `${EDIT_GUITAR_PATH_DIR}${guitarId}`,
				state: { from: location.pathname },
			});
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
			<span
				className="material-symbols-outlined outlined"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					editGuitar(guitarId);
					saveScrollPosition();
				}}>
				stylus
			</span>
			<DialogTrigger>
				<AriaButton
					className="material-symbols-outlined outlined"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}>
					delete
				</AriaButton>
				<Popover>
					<Text size="xsmall">Are you sure you want to delete this guitar?</Text>
					<Button
						state="danger"
						onClick={() => deleteGuitar(guitarId)}
						disabled={isPending}>
						Yes, delete
					</Button>
				</Popover>
			</DialogTrigger>
		</>
	);
}
