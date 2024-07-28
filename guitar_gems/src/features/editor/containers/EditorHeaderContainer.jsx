import { EditorHeader } from '../components/editor-header';
import { useEditorData } from '../contexts/EditorDataContext';
import { Button } from '@ui/button';
import { useRouteMatch } from 'react-router-dom';
import {
	ADD_GUITAR_PATH,
	EDIT_GUITAR_PATH_DIR,
} from '@features/router/constants/routePaths';

export function EditorHeaderContainer() {
	const { loading, handleCancelClick, error } = useEditorData();

	const isOnAddGuitarPage = Boolean(useRouteMatch(ADD_GUITAR_PATH));
	const isOnEditGuitarPage = Boolean(useRouteMatch(EDIT_GUITAR_PATH_DIR));

	const buttonName = isOnAddGuitarPage ? 'Publish' : 'Save';
	const buttonLoadingName = isOnAddGuitarPage ? 'Publishing...' : 'Saving...'; //TODO: Fix this, doesn't work

	const title = isOnAddGuitarPage ? 'Add Guitar' : 'Edit Guitar';

	const Buttons = () => {
		return (
			<>
				{isOnEditGuitarPage && (
					<Button
						state="danger"
						onClick={handleCancelClick}
						disabled={loading}
						width="180px">
						Cancel
					</Button>
				)}
				<Button state="accent" type="submit" width="180px" disabled={loading}>
					{loading ? buttonLoadingName : buttonName}
				</Button>
			</>
		);
	};

	return <EditorHeader title={title} Buttons={Buttons} error={error} />;
}
