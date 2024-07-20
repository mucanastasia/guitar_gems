import { Button } from 'react-aria-components';
import { useEditorData } from '../contexts/EditorDataContext';

function EditorHeader() {
	const { loading, displayButtonLabel, title, handleCancelClick, id } = useEditorData();

	return (
		<header className="editor">
			<h1>{title}</h1>
			<div className="edit-header-buttons">
				{id && (
					<Button
						className="cancel-button"
						onPress={handleCancelClick}
						isDisabled={loading}>
						Cancel
					</Button>
				)}
				<Button className="accent-button" type="submit" isDisabled={loading}>
					{displayButtonLabel()}
				</Button>
			</div>
		</header>
	);
}

export default EditorHeader;
