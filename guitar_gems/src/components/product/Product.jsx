import { useState, useEffect } from 'react';
import { supabase } from '@api/supabaseClient';
import { useSession } from '../auth/contexts/SessionContext';
import { DialogTrigger } from 'react-aria-components';
import { useParams, useHistory } from 'react-router-dom';
import Hero from './Hero';
import ProductContent from './ProductContent';
import ProductCard from '../catalogue/ProductCard';
import { Spinner } from '@ui/spinner';
import { Breadcrumbs } from '@ui/breadcrumbs';
import { MyPopover } from '@ui/popover';
import { Text } from '@ui/text';
import { Button } from '@ui/button';
import NotFoundPage from './NotFoundPage';
import './styles/product.css';

export default function Product() {
	const [guitarData, setGuitarData] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const history = useHistory();
	const { session } = useSession();
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

				setGuitarData(data);
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

	const handleEditClick = () => {
		history.push(`/editor/edit-guitar/${id}`);
	};

	const handleDeleteClick = async () => {
		setLoading(true);
		const { error } = await supabase.from('guitars').delete().eq('id', id);
		if (error) {
			console.error('Error deleting this guitar:', error);
			setLoading(false);
			return;
		} else {
			history.push(`/`);
		}
		setLoading(false);
	};

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <NotFoundPage />;
	}

	return (
		<>
			<Hero
				name={guitarData.name}
				brand={guitarData.brand.name}
				img={guitarData.main_img}
			/>
			<div className="product-wrap">
				<Breadcrumbs name={guitarData.name} brand={guitarData.brand.name} path="/" />
				<div className="product-content-container">
					<div className="product-card-container">
						<ProductCard
							brandName={guitarData.brand.name}
							guitarName={guitarData.name}
							mainImg={guitarData.main_img}
						/>
						{session?.user.app_metadata.role === 'editor' && (
							<>
								<Button state="primary" onClick={handleEditClick}>
									Edit
								</Button>
								{/* TODO: DeleteTrigger with context and etc */}
								<DialogTrigger>
									<Button state="danger">Delete</Button>
									<MyPopover>
										<Text size="xsmall">
											Are you sure you want to delete this guitar?
										</Text>
										<Button state="danger" onClick={handleDeleteClick} disabled={loading}>
											Yes, delete
										</Button>
									</MyPopover>
								</DialogTrigger>
							</>
						)}
					</div>
					<ProductContent guitarData={guitarData} />
				</div>
			</div>
		</>
	);
}
