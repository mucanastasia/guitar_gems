import { useState } from 'react';
import { EditorActions } from '../components/editor-actions';
import { supabase } from '@api/supabaseClient';
import { useSession } from '@features/auth/contexts/SessionContext';
import { useParams, useHistory } from 'react-router-dom';
import { ROOT_PATH, EDIT_GUITAR_PATH_DIR } from '@features/router/constants/routePaths';

export function EditorActionsContainer() {
	const [loading, setLoading] = useState(false);

	const { user } = useSession();
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

	return (
		<EditorActions
			loading={loading}
			handleEditClick={handleEditClick}
			handleDeleteClick={handleDeleteClick}
			isUserEditor={isUserEditor}
		/>
	);
}
