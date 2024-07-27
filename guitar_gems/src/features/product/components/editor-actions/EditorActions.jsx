import { Button } from '@ui/button';
import { Popover } from '@ui/popover';
import { Text } from '@ui/text';
import { DialogTrigger } from 'react-aria-components';

export function EditorActions({
	isUserEditor,
	handleEditClick,
	handleDeleteClick,
	loading,
}) {
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
					<Button state="danger" onClick={handleDeleteClick} disabled={loading}>
						Yes, delete
					</Button>
				</Popover>
			</DialogTrigger>
		</>
	);
}
