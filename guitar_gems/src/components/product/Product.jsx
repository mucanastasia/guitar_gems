import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useSession } from '../../contexts/SessionContext';
import {
	Breadcrumbs,
	Breadcrumb,
	Button,
	DialogTrigger,
	Dialog,
	OverlayArrow,
	Popover,
} from 'react-aria-components';
import { useParams, useHistory, Link } from 'react-router-dom';
import Hero from './Hero';
import ProductContent from './ProductContent';
import ProductCard from '../catalogue/ProductCard';
import Spinner from '../spinner/Spinner';
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
				<Breadcrumbs>
					<Breadcrumb>
						<Link to="/">Catalogue</Link>
					</Breadcrumb>
					<Breadcrumb>{`${guitarData.brand.name} — ${guitarData.name}`}</Breadcrumb>
				</Breadcrumbs>
				<div className="product-content-container">
					<div className="product-card-container">
						<ProductCard
							brandName={guitarData.brand.name}
							guitarName={guitarData.name}
							mainImg={guitarData.main_img}
						/>
						{session?.user.app_metadata.role === 'editor' && (
							<>
								<Button className="primary-button" onPress={handleEditClick}>
									Edit
								</Button>
								<DialogTrigger>
									<Button className="delete-button">Delete</Button>
									<Popover>
										<OverlayArrow>
											<svg width={12} height={12} viewBox="0 0 12 12">
												<path d="M0 0 L6 6 L12 0" />
											</svg>
										</OverlayArrow>
										<Dialog>
											<div className="delete-alert">
												<p>Are you sure you want to delete this guitar?</p>
												<Button
													className="delete-button"
													onPress={handleDeleteClick}
													isDisabled={loading}>
													Yes, delete
												</Button>
											</div>
										</Dialog>
									</Popover>
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
