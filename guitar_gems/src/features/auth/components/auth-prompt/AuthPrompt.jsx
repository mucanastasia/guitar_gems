import { Text } from '@ui/text';
import { LinkAuth } from '@ui/link';
import './AuthPrompt.css';

export function AuthPrompt({ text, path, name }) {
	return (
		<Text size="small">
			{text}
			<LinkAuth path={path} name={name} />
		</Text>
	);
}
