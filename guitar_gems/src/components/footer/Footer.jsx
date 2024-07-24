import { Input, Form, TextField } from 'react-aria-components';
import instagramIcn from './assets/instagram.svg';
import facebookIcn from './assets/facebook.svg';
import xIcn from './assets/x.svg';
import tiktokIcn from './assets/tiktok.svg';
import { Button } from '@ui/button';
import './styles/footer.css';
import { LinkTerms } from '@ui/link';
import { Text } from '@ui/text';

export default function Footer() {
	return (
		<footer>
			<div className="subscribe-section">
				<Text size="xlarge">Subscribe to our newsletters</Text>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<TextField name="email" type="email" aria-label="email">
						<Input placeholder="Email" />
						<Button state="white" type="submit" width="none">
							Subscribe
						</Button>
					</TextField>
				</Form>
			</div>
			<div className="social-media">
				<img src={instagramIcn} />
				<img src={facebookIcn} />
				<img src={xIcn} />
				<img src={tiktokIcn} />
			</div>
			<div className="copyright">
				<Text size="small">© 2024 Guitar gems company. All Rights Reserved</Text>
				<div className="terms">
					<LinkTerms name="Privacy & Policy" />
					<LinkTerms name="Terms & Condition" />
				</div>
			</div>
		</footer>
	);
}
