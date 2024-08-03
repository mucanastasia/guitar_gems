import { Hero } from '@ui/hero';
import { ProductCard } from '@ui/product-card';
import { EditorActionsContainer } from '@features/product/containers/EditorActionsContainer';
import { ProductContentContainer } from '@features/product/containers/ProductContentContainer';
import { Breadcrumbs } from '@ui/breadcrumbs';
import { Button } from '@ui/button';
import { ROOT_PATH } from '@features/router/constants/routePaths';
import './Product.css';

export function Product({ name, brand, img, isLoggedIn, isFavourite, handleFavourites }) {
	return (
		<>
			<Hero brand={brand} name={name} img={img} />
			<div className="product-wrap">
				<Breadcrumbs name={name} brand={brand} path={ROOT_PATH} />
				<div className="product-content-container">
					<div className="product-card-container">
						<ProductCard brand={brand.name} name={name} image={img} />

						{isLoggedIn && (
							<Button state="primary" onClick={handleFavourites}>
								{isFavourite ? 'Delete from my picks' : 'Add to my picks'}
							</Button>
						)}
						<EditorActionsContainer />
					</div>
					<ProductContentContainer />
				</div>
			</div>
		</>
	);
}
