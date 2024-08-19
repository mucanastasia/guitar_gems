import { Hero } from '@ui/hero';
import { ProductCard } from '@ui/product-card';
import { EditorActionsContainer } from '../../containers/EditorActionsContainer';
import { ProductContentContainer } from '../../containers/ProductContentContainer';
import { Breadcrumbs } from '@ui/breadcrumbs';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import { Button } from '@ui/button';
import './Product.css';
import { CompareActionContainer } from '@features/comparison/containers/CompareActionContainer';

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
								{isFavorite ? 'Delete from my picks' : 'Add to my picks'}
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
