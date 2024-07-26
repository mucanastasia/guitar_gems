import { SubscriptionContainer } from '../../containers';
import { Text } from '@ui/text';
import { LinkTerms } from '@ui/link';
import instagramIcn from '@assets/instagram.svg';
import facebookIcn from '@assets/facebook.svg';
import xIcn from '@assets/x.svg';
import tiktokIcn from '@assets/tiktok.svg';
import './Footer.css';

export function Footer() {
	const icons = [
		{ id: 'instagram', src: instagramIcn },
		{ id: 'facebook', src: facebookIcn },
		{ id: 'twitter', src: xIcn },
		{ id: 'tiktok', src: tiktokIcn },
	];

	return (
		<footer>
			<SubscriptionContainer />

			<div className="social-media">
				{icons.map((icon) => (
					<img key={icon.id} src={icon.src} alt={`${icon.id} icon`} />
				))}
			</div>

			<div className="copyright-section">
				<Text size="small">© 2024 Guitar gems company. All Rights Reserved</Text>
				<div className="terms-links">
					<LinkTerms name="Privacy & Policy" />
					<LinkTerms name="Terms & Condition" />
				</div>
			</div>
		</footer>
	);
}
