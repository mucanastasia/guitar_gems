import { useLayoutEffect, useState } from 'react';
import { HeadingSmall } from '@ui/heading';
import { Text } from '@ui/text';
import { Spinner } from '@ui/spinner';
import './ProductCard.css';

export function ProductCard({ brand, name, image, loading, isFavourite, onClick }) {
	const [isClicked, setIsClicked] = useState(isFavourite || false);

	useLayoutEffect(() => {
		setIsClicked(isFavourite);
	}, [isFavourite]);

	return (
		<section className="product-card">
			{onClick && (
				<span
					className={`material-symbols-outlined ${isClicked ? 'filled' : 'outlined'}`}
					onClick={(e) => {
						setIsClicked((prevState) => !prevState);
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
