import { Product } from '../components/product';
import { useParams } from 'react-router-dom';
import { Spinner } from '@ui/spinner';
import { NotFoundPage } from '@features/not-found';
import { useTitle } from '@helpers/useTitle';
import { useGuitarData } from '@api/useGuitarData';
import { useUser } from '@api/useUser';
import { useAddFavourites } from '@api/useAddFavourites';
import { useDeleteFavourites } from '@api/useDeleteFavourites';

export function ProductContainer() {
	const { id } = useParams();

	const { data: guitar, isPending, isError } = useGuitarData(id);
	const { data: user } = useUser();

	const isLoggedIn = user !== null;
	const isFavourite = guitar?.isFavorite;

	const { mutate: addFavourites } = useAddFavourites();
	const { mutate: deleteFavourites } = useDeleteFavourites();

	const handleFavourites = async () => {
		if (isFavourite) {
			await deleteFavourites({ favoriteId: guitar.favourites[0].id });
		} else {
			await addFavourites({ guitarId: id });
		}
	};

	useTitle(`${guitar?.brand?.name} - ${guitar?.name}`);

	if (isPending) {
		return <Spinner />;
	}

	if (isError) {
		return <NotFoundPage />;
	}

	return (
		<Product
			name={guitar.name}
			brand={guitar.brand.name}
			img={guitar.main_img}
			isLoggedIn={isLoggedIn}
			isFavourite={isFavourite}
			handleFavourites={handleFavourites}
		/>
	);
}
