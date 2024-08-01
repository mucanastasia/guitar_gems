import { useState } from 'react';
import { supabase } from '@api/supabaseClient';
import { useParams, useHistory } from 'react-router-dom';
import { ROOT_PATH, EDIT_GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { Button } from '@ui/button';
import { Popover } from '@ui/popover';
import { Text } from '@ui/text';
import { DialogTrigger } from 'react-aria-components';
import { useUser } from '@api/useUser';

export function EditorActionsContainer() {
	const [loading, setLoading] = useState(false);

	const { data: user } = useUser();
	const isUserEditor = user?.app_metadata.role === 'editor';

	const { id } = useParams();
	const history = useHistory();

	const handleEditClick = () => {
		history.push(`${EDIT_GUITAR_PATH_DIR}${id}`);
	};

	const handleDeleteClick = async () => {
		setLoading(true);
		const { error } = await supabase.from('guitars').delete().eq('id', id);
		if (error) {
			console.error('Error deleting this guitar:', error);
			//TODO: Alert???
			//To test it: open the same guitar twice and delete it in one tab then try to delete in another one
			setLoading(false);
			return;
		} else {
			history.push(ROOT_PATH);
		}
		setLoading(false);
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
					<Button state="danger" onClick={handleDeleteClick} disabled={loading}>
						Yes, delete
					</Button>
				</Popover>
			</DialogTrigger>
		</>
	);
}
