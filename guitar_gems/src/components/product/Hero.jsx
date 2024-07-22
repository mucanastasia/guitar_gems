import { HeadingLarge } from '@ui/heading';
import { TextLarge } from '@ui/text';
import shadowImg from './assets/shadow.png';
import './styles/hero.css';

export default function Hero({ name, brand, img }) {
	return (
		<section className="product-hero">
			<div className="wrap">
				<div className="product-name">
					<TextLarge text={brand} />
					<HeadingLarge text={name} />
				</div>
				<div className="main-img" style={{ backgroundImage: `url(${img})` }} />
				<img className="shadow-img" src={shadowImg} />
			</div>
		</section>
	);
}
