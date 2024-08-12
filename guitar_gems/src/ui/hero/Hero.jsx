import { HeadingLarge } from '@ui/heading';
import { Text } from '@ui/text';
import shadowImg from './assets/shadow.png';
import './Hero.css';

export function Hero({ name, brand, img }) {
	return (
		<section className="product-hero">
			<div className="wrap">
				<div className="product-name">
					<Text size="large">{brand}</Text>
					<HeadingLarge text={name} />
				</div>
				<div className="main-img" style={{ backgroundImage: `url(${img})` }} />
				<img className="shadow-img" src={shadowImg} />
			</div>
		</section>
	);
}
