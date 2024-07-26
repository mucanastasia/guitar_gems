import { HeadingSmall } from '@ui/heading';
import { Text } from '@ui/text';
import './ProductCard.css';

export function ProductCard({ brand, name, image }) {
	return (
		<section className="product-card">
			<img className="product-card-img" src={image} alt={`${brand} ${name} image`} />
			<Text size="small">{brand}</Text>
			<HeadingSmall text={name} />
		</section>
	);
}
