import { Product } from '../components/product';
import { useParams } from 'react-router-dom';
import { Spinner } from '@ui/spinner';
import { NotFoundPage } from '@features/error';
import { useTitle } from '@helpers/useTitle';
import { useGuitarData } from '@api/useGuitarData';
import { useUser } from '@api/useUser';
import { useAddFavourites } from '@api/useAddFavourites';
import { useDeleteFavourites } from '@api/useDeleteFavourites';
import { useScrollRestoration } from '@helpers/useScrollRestoration';
import { useFavourites } from '@api/useFavourites';

export function ProductContainer() {
	const { id } = useParams();

	const { data: user } = useUser();
	const { data: guitar, isPending, isError } = useGuitarData(id);

	useTitle(guitar && `${guitar.brand.name} - ${guitar.name}`);

	useScrollRestoration();

	const { mutate: addFavourites } = useAddFavourites();
	const { mutate: deleteFavourites } = useDeleteFavourites();
	const { refetch: refetchFavourites } = useFavourites();

	const handleFavourites = async () => {
		const guitarId = id;
		!guitar.isFavourite && (await addFavourites({ guitarId }));
		guitar.isFavourite &&
			(await deleteFavourites({ guitarId }, { onSuccess: refetchFavourites }));
	};

	if (isPending) {
		return <Spinner />;
	}

	if (isError) {
		return <NotFoundPage />;
	}

	return (
		<Product
			id={guitar.id}
			name={guitar.name}
			brand={guitar.brand.name}
			img={guitar.main_img}
			isLoggedIn={user !== null}
			isFavorite={guitar.isFavourite}
			handleFavourites={handleFavourites}
		/>
	);
}
