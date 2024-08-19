import { Hero } from '@ui/hero';
import { ProductCard } from '@ui/product-card';
import { EditorActionsContainer } from '../../containers/EditorActionsContainer';
import { ProductContentContainer } from '../../containers/ProductContentContainer';
import { Breadcrumbs } from '@ui/breadcrumbs';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import { Button } from '@ui/button';
import {
	ADD_TO_FAVOURITES_NAME,
	DELETE_FROM_FAVOURITES_NAME,
} from '../../constants/toggleFavouritesNames';
import { CompareActionContainer } from '@features/comparison/containers/CompareActionContainer';
import './Product.css';

export function Product({ ...props }) {
	const { id, name, brand, img, isLoggedIn, handleFavourites, isFavorite } = props;
	return (
		<>
			<Hero brand={brand} name={name} img={img} />
			<div className="product-wrap">
				<Breadcrumbs name={name} brand={brand} path={ROOT_PATH} />
				<div className="product-content-container">
					<div className="product-card-container">
						<ProductCard brand={brand} name={name} image={img} />

						{isLoggedIn && (
							<Button
								state={isFavorite ? 'toggle-accent' : 'toggle-primary'}
								onClick={handleFavourites}>
								{isFavorite ? DELETE_FROM_FAVOURITES_NAME : ADD_TO_FAVOURITES_NAME}
							</Button>
						)}

						<CompareActionContainer id={id} name={name} />

						<div className="editor-actions">
							<EditorActionsContainer />
						</div>
					</div>
					<ProductContentContainer />
				</div>
			</div>
		</>
	);
}
