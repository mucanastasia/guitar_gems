import { useState, useEffect } from 'react';
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

	const { data: user } = useUser();
	const { data: guitar, isPending, isError } = useGuitarData(id);

	useTitle(`${guitar?.brand?.name} - ${guitar?.name}`);

	const isLoggedIn = user !== null;

	const [isFavourite, setIsFavourite] = useState(null);

	useEffect(() => {
		setIsFavourite(guitar?.isFavourite);
	}, [guitar?.isFavourite]);

	const { mutate: addFavourites } = useAddFavourites();
	const { mutate: deleteFavourites } = useDeleteFavourites();

	const handleFavourites = async () => {
		setIsFavourite((prevState) => !prevState);
		!isFavourite && (await addFavourites({ guitarId: id }));
		isFavourite && (await deleteFavourites({ guitarId: id }));
	};

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
			isFavorite={isFavourite}
			handleFavourites={handleFavourites}
		/>
	);
}
