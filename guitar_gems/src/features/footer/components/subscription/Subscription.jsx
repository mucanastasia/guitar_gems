import { Text } from '@ui/text';
import { TextField } from '@ui/text-field';
import { Button } from '@ui/button';
import { Form } from 'react-aria-components';

import './Subscription.css';

export function Subscription({ onSubmit }) {
	return (
		<div className="subscribe-section">
			<Text size="xlarge">Subscribe to our newsletters</Text>
			<Form onSubmit={onSubmit}>
				<TextField name="Email" />
				<Button state="white" type="submit" width="none">
					Subscribe
				</Button>
			</Form>
		</div>
	);
}
