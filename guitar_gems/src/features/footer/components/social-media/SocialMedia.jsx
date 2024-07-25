import instagramIcn from '@assets/instagram.svg';
import facebookIcn from '@assets/facebook.svg';
import xIcn from '@assets/x.svg';
import tiktokIcn from '@assets/tiktok.svg';
import './SocialMedia.css';

export function SocialMedia() {
	const icons = [
		{ id: 'instagram', src: instagramIcn },
		{ id: 'facebook', src: facebookIcn },
		{ id: 'twitter', src: xIcn },
		{ id: 'tiktok', src: tiktokIcn },
	];

	return (
		<div className="social-media">
			{icons.map((icon) => (
				<img key={icon.id} src={icon.src} alt={`${icon.id} icon`} />
			))}
		</div>
	);
}
