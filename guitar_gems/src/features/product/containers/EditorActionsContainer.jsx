import { useParams, useHistory } from 'react-router-dom';
import { EDIT_GUITAR_PATH_DIR, ROOT_PATH } from '@features/router/constants/routePaths';
import { Button } from '@ui/button';
import { Popover } from '@ui/popover';
import { Text } from '@ui/text';
import { DialogTrigger } from 'react-aria-components';
import { useUser } from '@api/useUser';
import { useDeleteGuitar } from '@api/useDeleteGuitar';

export function EditorActionsContainer() {
	const { data: user } = useUser();
	const isUserEditor = user?.app_metadata.role === 'editor';

	const { mutate, isPending } = useDeleteGuitar();

	const { id } = useParams();
	const history = useHistory();

	const handleEditClick = () => {
		history.push(`${EDIT_GUITAR_PATH_DIR}${id}`);
	};

	const handleDeleteClick = async () => {
		await mutate(
			{ id },
			{
				onSuccess: () => {
					setTimeout(() => {
						history.push(ROOT_PATH);
					}, 200);
				},
			}
		);
	};

	if (!isUserEditor) {
		return null;
	}

	return (
		<>
			<Button state="primary" onClick={handleEditClick}>
				Edit
			</Button>

			<DialogTrigger>
				<Button state="danger">Delete</Button>
				<Popover>
					<Text size="xsmall">Are you sure you want to delete this guitar?</Text>
					<Button state="danger" onClick={handleDeleteClick} disabled={isPending}>
						{isPending ? 'Deleting...' : 'Yes, delete'}
					</Button>
				</Popover>
			</DialogTrigger>
		</>
	);
}
