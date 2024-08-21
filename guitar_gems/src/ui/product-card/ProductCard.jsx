import { HeadingSmall } from '@ui/heading';
import { Text } from '@ui/text';
import { IconButton } from '@ui/icon';
import { Spinner } from '@ui/spinner';
import './ProductCard.css';

export function ProductCard({ ...props }) {
	const {
		brand,
		name,
		image,
		loading,
		isFavourite,
		onFavouriteClick,
		CardActions,
		onClick,
		refValue,
	} = props;

	return (
		<section className="product-card" ref={refValue}>
			<div className="product-card-actions">
				{onFavouriteClick && (
					<IconButton
						name="favorite"
						size="medium"
						className={`material-symbols-outlined ${isFavourite ? 'filled' : 'outlined'}`}
						onClick={() => {
							onFavouriteClick();
						}}
					/>
				)}
				{CardActions && (
					<div className="product-card-additional-actions">{CardActions}</div>
				)}
			</div>
			<div className="product-card-content" onClick={onClick}>
				{loading ? (
					<Spinner />
				) : (
					<img className="product-card-img" src={image} alt={`${brand} ${name} image`} />
				)}
				<Text size="small">{brand}</Text>
				<HeadingSmall text={name} />
			</div>
		</section>
	);
}
