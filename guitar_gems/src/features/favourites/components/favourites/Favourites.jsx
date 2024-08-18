import { ProductCard } from '@ui/product-card';
import { Text } from '@ui/text';
import { LinkAuth } from '@ui/link';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import { Link } from 'react-router-dom';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { Skeleton } from '@ui/skeleton';
import { CARDS_PER_PAGE } from '@features/catalogue/constants/catalogue';
import './Favourites.css';

export function Favourites({
	favourites,
	isError,
	isFetchingNextPage,
	lastCardRef,
	isFetching,
	deleteFavourites,
	EditorActions,
}) {
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
								<Link
									key={guitar.id}
									to={`${GUITAR_PATH_DIR}${guitar.id}`}
									ref={lastCardRef}>
									<ProductCard
										brand={guitar.brand_name}
										name={guitar.name}
										image={guitar.main_img}
										isFavourite={guitar.is_favourite}
										onFavouriteClick={() => {
											deleteFavourites({ guitarId: guitar.id });
										}}
										EditorActions={
											EditorActions && <EditorActions id={guitar.id} name={guitar.name} />
										}
									/>
								</Link>
							);
						} else {
							return (
								<Link key={guitar.id} to={`${GUITAR_PATH_DIR}${guitar.id}`}>
									<ProductCard
										brand={guitar.brand_name}
										name={guitar.name}
										image={guitar.main_img}
										isFavourite={guitar.is_favourite}
										onFavouriteClick={() => {
											deleteFavourites({ guitarId: guitar.id });
										}}
										EditorActions={
											EditorActions && <EditorActions id={guitar.id} name={guitar.name} />
										}
									/>
								</Link>
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
