import { Product } from '../components/product';
import { useParams } from 'react-router-dom';
import { Spinner } from '@ui/spinner';
import { NotFoundPage } from '@features/not-found';
import { useTitle } from '@helpers/useTitle';
import { useGuitarData } from '@api/useGuitarData';

export function ProductContainer() {
	const { id } = useParams();
	const { data: guitar, isLoading, isError } = useGuitarData(id);

	useTitle(`${guitar?.brand?.name} - ${guitar?.name}`);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <NotFoundPage />;
	}

	return <Product name={guitar.name} brand={guitar.brand.name} img={guitar.main_img} />;
}
