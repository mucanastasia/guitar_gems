import { useEffect, useState } from 'react';
import { GuitarProvider } from '../contexts/GuitarContext';
import { Product } from '../components/product';
import { useParams } from 'react-router-dom';
import { supabase } from '@api/supabaseClient';
import { Spinner } from '@ui/spinner';
import { NotFoundPage } from '@features/not-found';
import { useTitle } from '@helpers/useTitle';

export function ProductContainer() {
	const [guitar, setGuitar] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data, error } = await supabase
					.from('guitars')
					.select(
						`
                            id,
                            name,
                            description,
                            release_date,
                            main_img,
                            brand:brands (
                                id,
                                name
                            ),
                            country:countries(
                                id,
                                name
                            ),
                            type:guitar_types(
                                id,
                                name
                            ),
                            body_material:materials!body_material_id(
                                id,
                                name
                            ),
                            neck_material:materials!neck_material_id(
                                id,
                                name
                            ),
                            fingerboard_material:materials!fingerboard_material_id(
                                id,
                                name
                            ),
                            features
                        `
					)
					.eq('id', id)
					.single();

				if (error) throw error;

				setGuitar(data);
				setError(false);
			} catch (error) {
				console.error(error.message);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	useTitle(`${guitar?.brand?.name} - ${guitar?.name}`);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <NotFoundPage />;
	}

	return (
		<GuitarProvider guitar={guitar}>
			<Product name={guitar.name} brand={guitar.brand.name} img={guitar.main_img} />
		</GuitarProvider>
	);
}
