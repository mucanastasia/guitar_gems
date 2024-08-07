import { HeadingSmall } from '@ui/heading';
import { Text } from '@ui/text';
import { Spinner } from '@ui/spinner';
import './ProductCard.css';

export function ProductCard({ brand, name, image, loading, isFavourite, onClick }) {
	return (
		<section className="product-card">
			{onClick && (
				<span
					className={`material-symbols-outlined ${isFavourite ? 'filled' : 'outlined'}`}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onClick();
					}}>
					favorite
				</span>
			)}
			{loading ? (
				<Spinner />
			) : (
				<img className="product-card-img" src={image} alt={`${brand} ${name} image`} />
			)}
			<Text size="small">{brand}</Text>
			<HeadingSmall text={name} />
		</section>
	);
}
