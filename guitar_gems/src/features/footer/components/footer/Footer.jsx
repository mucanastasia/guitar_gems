import { SubscriptionContainer } from '@features/footer/containers/SubscriptionContainer';
import { SocialMedia } from '@features/footer/components/social-media';
import { CopyrightTerms } from '@features/footer/components/copyright-terms';
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
