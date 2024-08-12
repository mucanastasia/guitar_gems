import { EditorHeader } from '../components/editor-header';
import { useEditorData } from '../contexts/EditorDataContext';
import { Button } from '@ui/button';
import { useParams, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {
	ADD_GUITAR_PATH,
	EDIT_GUITAR_PATH_DIR,
	GUITAR_PATH_DIR,
} from '@features/router/constants/routePaths';
import { ADD_GUITAR_TITLE, EDIT_GUITAR_TITLE } from '../constants/editor';
import { useScrollRestoration } from '@helpers/useScrollRestoration';

export function EditorHeaderContainer() {
	const { submitting, error } = useEditorData();

	const isOnAddGuitarPage = Boolean(useRouteMatch(ADD_GUITAR_PATH));
	const isOnEditGuitarPage = Boolean(useRouteMatch(EDIT_GUITAR_PATH_DIR));

	const buttonName = isOnAddGuitarPage ? 'Publish' : 'Save';
	const buttonLoadingName = isOnAddGuitarPage ? 'Publishing...' : 'Saving...';

	const title = isOnAddGuitarPage ? ADD_GUITAR_TITLE : EDIT_GUITAR_TITLE;

	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();

	const { restoreScrollPosition } = useScrollRestoration();

	const handleCancelClick = () => {
		if (location.state?.from) {
			restoreScrollPosition();
			history.push(location.state?.from);
			return;
		}
		history.push(`${GUITAR_PATH_DIR}${id}`);
	};

	const Buttons = () => {
		return (
			<>
				{isOnEditGuitarPage && (
					<Button
						state="danger"
						onClick={handleCancelClick}
						disabled={submitting}
						width="180px">
						Cancel
					</Button>
				)}
				<Button state="accent" type="submit" width="180px" disabled={submitting}>
					{submitting ? buttonLoadingName : buttonName}
				</Button>
			</>
		);
	};

	return <EditorHeader title={title} Buttons={Buttons} error={error} />;
}
