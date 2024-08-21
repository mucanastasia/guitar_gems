import { Text } from '@ui/text';
import { TextField } from '@ui/text-field';
import { Button } from '@ui/button';
import { Form } from 'react-aria-components';

import './Subscription.css';

export function Subscription({ onSubmit, subscribeEmailRef, handleChange }) {
	return (
		<div className="subscribe-section">
			<Text size="xlarge">Subscribe to our newsletter</Text>
			<Form onSubmit={onSubmit}>
				<TextField name="Email" refValue={subscribeEmailRef} onChange={handleChange} />
				<Button state="white" type="submit" width="none">
					Subscribe
				</Button>
			</Form>
		</div>
	);
}
