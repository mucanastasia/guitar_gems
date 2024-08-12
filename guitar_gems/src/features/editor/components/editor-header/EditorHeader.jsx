import { HeadingLarge } from '@ui/heading';
import { TextError } from '@ui/text-error';
import './EditorHeader.css';

export function EditorHeader({ ...props }) {
	const { title, Buttons, error } = props;

	return (
		<header className="editor">
			<HeadingLarge text={title} />
			<div className="edit-header-buttons">
				<TextError>{error}</TextError>
				<Buttons />
			</div>
		</header>
	);
}
