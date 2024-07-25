import { Text } from '@ui/text';
import { LinkTerms } from '@ui/link';
import './CopyrightTerms.css';

export function CopyrightTerms() {
	return (
		<div className="copyright-section">
			<Text size="small">© 2024 Guitar gems company. All Rights Reserved</Text>
			<div className="terms-links">
				<LinkTerms name="Privacy & Policy" />
				<LinkTerms name="Terms & Condition" />
			</div>
		</div>
	);
}
