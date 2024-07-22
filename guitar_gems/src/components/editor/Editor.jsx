import { useEffect, useRef } from 'react';
import { supabase } from '../../api/supabaseClient';
import { useEditorData } from './contexts/EditorDataContext';
import { Form } from 'react-aria-components';
import ProductCard from '../catalogue/ProductCard';
import EditorContent from './editorComponents/EditorContent';
import PhotoUploader from './editorComponents/PhotoUploader';
import './styles/editor.css';
import EditorHeader from './editorComponents/EditorHeader';
import EditorHero from './editorComponents/EditorHero';
import defaultImg from '../../assets/img-placeholder.png';

export default function Editor() {
	const { data, handleSubmit } = useEditorData();
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
		const brand = Object.values(brandsRef.current).find((brand) => brand.id === brandId);
		return brand ? brand.name : 'Brand Name';
	};

	return (
		<>
			<EditorHero displayBrandName={displayBrandName} />
			<div className="editor-wrap">
				<Form onSubmit={handleSubmit}>
					<EditorHeader />
					<div className="product-content-container">
						<div>
							<ProductCard
								brandName={displayBrandName(data.brand_id)}
								guitarName={data?.name ? data.name : 'There will be a name'}
								mainImg={data.main_img ? data.main_img : defaultImg}
							/>
							<PhotoUploader />
						</div>
						<EditorContent />
					</div>
				</Form>
			</div>
		</>
	);
}
