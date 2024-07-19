import { useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import { useEditorData } from './contexts/EditorDataContext';
import { Form, Button } from 'react-aria-components';
import ProductCard from '../catalogue/ProductCard';
import EditorContent from './EditorContent';
import Hero from '../product/Hero';
import Spinner from '../spinner/Spinner';
import defaultImg from '../../assets/img-placeholder.png';
import PhotoUploader from './PhotoUploader';
import './styles/editor.css';

export default function Editor({
	handleSubmit,
	title,
	displayButtonLabel,
	handleCancelClick,
	id = null,
}) {
	const { data, setData, loading, uploadingPhoto } = useEditorData();
	const brandsRef = useRef({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data, error } = await supabase.from('brands').select(`id,name`);

				if (error) throw error;

				brandsRef.current = data;
			} catch (error) {
				console.error(error.message);
			}
		};

		fetchData();
	}, []);

	const displayBrandName = (brandId) => {
		const brand = Object.values(brandsRef.current).find(
			(brand) => brand.id === brandId
		);
		return brand ? brand.name : 'Brand Name';
	};

	return (
		<>
			{uploadingPhoto ? (
				<Spinner />
			) : (
				<Hero
					img={data.main_img ? data.main_img : defaultImg}
					name={data?.name ? data.name : 'There will be a name'}
					brand={displayBrandName(data.brand_id)}
				/>
			)}
			<div className="editor-wrap">
				<Form onSubmit={handleSubmit}>
					<header className="editor">
						<h1>{title}</h1>
						<div className="edit-header-buttons">
							{id && (
								<Button
									className="cancel-button"
									onPress={handleCancelClick}
									isDisabled={loading}>
									Cancel
								</Button>
							)}
							<Button
								className="accent-button"
								type="submit"
								isDisabled={loading}>
								{displayButtonLabel()}
							</Button>
						</div>
					</header>
					<div className="product-content-container">
						<div>
							<ProductCard
								brandName={displayBrandName(data.brand_id)}
								guitarName={data?.name ? data.name : 'There will be a name'}
								mainImg={data.main_img ? data.main_img : defaultImg}
							/>
							<PhotoUploader />
						</div>
						<EditorContent data={data} setData={setData} />
					</div>
				</Form>
			</div>
		</>
	);
}
