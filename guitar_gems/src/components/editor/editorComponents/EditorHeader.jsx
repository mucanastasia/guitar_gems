import { useEditorData } from '../contexts/EditorDataContext';
import { HeadingLarge } from '@ui/heading';
import { Button } from '@ui/button';
import { TextError } from '@ui/text-error';

export default function EditorHeader() {
	const { loading, displayButtonLabel, title, handleCancelClick, id, error } =
		useEditorData();

	return (
		<header className="editor">
			<HeadingLarge text={title} />
			<div className="edit-header-buttons">
				<TextError>{error}</TextError>
				{id && (
					<Button
						state="danger"
						onClick={handleCancelClick}
						disabled={loading}
						width="180px">
						Cancel
					</Button>
				)}
				<Button state="accent" type="submit" width="180px" disabled={loading}>
					{displayButtonLabel()}
				</Button>
			</div>
		</header>
	);
}
