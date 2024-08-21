import { ProductCard } from '@ui/product-card';
import { Text } from '@ui/text';
import { LinkAuth } from '@ui/link';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import { Skeleton } from '@ui/skeleton';
import { CARDS_PER_PAGE } from '@features/catalogue/constants/catalogue';
import { CompareActionContainer } from '@features/comparison/containers/CompareActionContainer';
import './Favourites.css';

export function Favourites({ ...props }) {
	const {
		favourites,
		isError,
		isFetchingNextPage,
		lastCardRef,
		isFetching,
		deleteFavourites,
		handleGuitarClick,
	} = props;

	if ((!isFetching && favourites.length === 0) || isError) {
		return (
			<div className="empty-favourites">
				<Text size="large">{`You haven't added any guitars to your picks yet!`}</Text>
				<Text size="small">
					<LinkAuth path={ROOT_PATH} name="Explore the catalogue" />
				</Text>
			</div>
		);
	}

	return (
		<div className="favourites">
			<div className="favourites-container">
				{isFetching && favourites.length === 0 ? (
					<Skeleton count={CARDS_PER_PAGE} />
				) : (
					favourites.map((guitar, index) => {
						if (favourites.length === index + 1) {
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
										deleteFavourites({ guitarId: guitar.id });
									}}
									CardActions={
										CompareActionContainer && (
											<CompareActionContainer id={guitar.id} name={guitar.name} />
										)
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
										deleteFavourites({ guitarId: guitar.id });
									}}
									CardActions={
										CompareActionContainer && (
											<CompareActionContainer id={guitar.id} name={guitar.name} />
										)
									}
								/>
							);
						}
					})
				)}
				{isFetchingNextPage && favourites.length > 0 && (
					<Skeleton count={CARDS_PER_PAGE} />
				)}
			</div>
		</div>
	);
}
