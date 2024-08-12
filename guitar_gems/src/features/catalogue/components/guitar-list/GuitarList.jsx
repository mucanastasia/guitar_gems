import { Skeleton } from '@ui/skeleton';
import { CARDS_PER_PAGE } from '../../constants/catalogue';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { Link } from 'react-router-dom';
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
	} = props;

	return (
		<div className="catalogue-container">
			{isFetching && guitars.length === 0 ? (
				<Skeleton count={CARDS_PER_PAGE} />
			) : (
				guitars.map((guitar, index) => {
					if (guitars.length === index + 1) {
						return (
							<Link
								key={guitar.id}
								to={`${GUITAR_PATH_DIR}${guitar.id}`}
								ref={lastCardRef}
								target="_blank"
								rel="noopener noreferrer">
								<ProductCard
									brand={guitar.brand_name}
									name={guitar.name}
									image={guitar.main_img}
									isFavourite={guitar.is_favourite}
									onFavouriteClick={() => {
										handleFavourites(guitar);
									}}
									EditorActions={
										isUserEditor ? <EditorActionsContainer guitarId={guitar.id} /> : false
									}
								/>
							</Link>
						);
					} else {
						return (
							<Link
								key={guitar.id}
								to={`${GUITAR_PATH_DIR}${guitar.id}`}
								target="_blank"
								rel="noopener noreferrer">
								<ProductCard
									brand={guitar.brand_name}
									name={guitar.name}
									image={guitar.main_img}
									isFavourite={guitar.is_favourite}
									onFavouriteClick={() => {
										handleFavourites(guitar);
									}}
									EditorActions={
										isUserEditor ? <EditorActionsContainer guitarId={guitar.id} /> : false
									}
								/>
							</Link>
						);
					}
				})
			)}
			{isFetchingNextPage && guitars.length > 0 && <Skeleton count={CARDS_PER_PAGE} />}
		</div>
	);
}
