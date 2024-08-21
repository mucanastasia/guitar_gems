import { Skeleton } from '@ui/skeleton';
import { CARDS_PER_PAGE } from '../../constants/catalogue';
import { ProductCard } from '@ui/product-card';
import { EditorActionsContainer } from '../../containers/EditorActionsContainer';
import './GuitarList.css';

export function GuitarList({ ...props }) {
	const {
		guitars,
		isFetching,
		isFetchingNextPage,
		lastCardRef,
		handleFavourites,
		isUserEditor,
		handleGuitarClick,
	} = props;

	return (
		<div className="catalogue-container">
			{isFetching && guitars.length === 0 ? (
				<Skeleton count={CARDS_PER_PAGE} />
			) : (
				guitars.map((guitar, index) => {
					if (guitars.length === index + 1) {
						return (
							<ProductCard
								key={guitar.id}
								onClick={() => handleGuitarClick(guitar.id)}
								refValue={lastCardRef}
								brand={guitar.brand_name}
								name={guitar.name}
								image={guitar.main_img}
								isFavourite={guitar.is_favourite}
								onFavouriteClick={() => {
									handleFavourites(guitar);
								}}
								CardActions={
									isUserEditor ? <EditorActionsContainer guitarId={guitar.id} /> : false
								}
							/>
						);
					} else {
						return (
							<ProductCard
								key={guitar.id}
								onClick={() => handleGuitarClick(guitar.id)}
								brand={guitar.brand_name}
								name={guitar.name}
								image={guitar.main_img}
								isFavourite={guitar.is_favourite}
								onFavouriteClick={() => {
									handleFavourites(guitar);
								}}
								CardActions={
									isUserEditor ? <EditorActionsContainer guitarId={guitar.id} /> : false
								}
							/>
						);
					}
				})
			)}
			{isFetchingNextPage && guitars.length > 0 && <Skeleton count={CARDS_PER_PAGE} />}
		</div>
	);
}
