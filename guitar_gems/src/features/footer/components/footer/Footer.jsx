import { SubscriptionContainer } from '../../containers';
import { SocialMedia } from '../social-media';
import { CopyrightTerms } from '../copyright-terms';
import './Footer.css';

export function Footer() {
	return (
		<footer>
			<SubscriptionContainer />
			<SocialMedia />
			<CopyrightTerms />
		</footer>
	);
}
