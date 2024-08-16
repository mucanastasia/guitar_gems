import { HeadingSmall } from '@ui/heading';
import { Text } from '@ui/text';
import { IconButton } from '@ui/icon';
import { Spinner } from '@ui/spinner';
import './ProductCard.css';

export function ProductCard({
	brand,
	name,
	image,
	loading,
	isFavourite,
	onFavouriteClick,
	EditorActions,
}) {
	return (
		<section className="product-card">
			<div className="product-card-actions">
				{onFavouriteClick && (
					<IconButton
						name="favorite"
						size="medium"
						className={`material-symbols-outlined ${isFavourite ? 'filled' : 'outlined'}`}
						onClick={(e) => {
							onFavouriteClick();
						}}
						preventDefault
					/>
				)}
				{EditorActions && (
					<div className="product-card-editor-actions" id="product-card-editor-actions">
						{EditorActions}
					</div>
				)}
			</div>
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
