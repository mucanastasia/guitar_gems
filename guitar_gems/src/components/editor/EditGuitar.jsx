import { useState, useEffect, useRef } from 'react';
import EditorContent from './EditorContent';
import ProductCard from '../catalogue/ProductCard';
import { Form, Button, FileTrigger } from 'react-aria-components';
import { supabase } from '../../supabaseClient';
import { useParams, useHistory } from 'react-router-dom';
import defaultImg from '../../assets/img-placeholder.png';
import Hero from '../product/Hero';
import Spinner from '../spinner/Spinner';
import './styles/editor.css';

export default function EditGuitar() {
	const { id } = useParams();
	const history = useHistory();

	const [data, setData] = useState({
		name: '',
		description: '',
		brand_id: '',
		type_id: '',
		body_material_id: '',
		neck_material_id: '',
		fingerboard_material_id: '',
		release_date: '',
		country_id: '',
		main_img: '',
		features: [],
	});
	const [error, setError] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(false);
	const brandsRef = useRef({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoadingData(true);
				const { data, error } = await supabase
					.from('guitars')
					.select(
						`
                            id,
                            name,
                            description,
                            release_date,
                            main_img,
                            brand_id,
                            country_id,
                            type_id,
                            body_material_id,
                            neck_material_id,
                            fingerboard_material_id,
                            features
                        `
					)
					.eq('id', id)
					.single();

				if (error) throw error;

				setData(data);
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoadingData(false);
			}
		};

		fetchData();
	}, [id]);

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

	const uploadImg = async (file) => {
		setError(false);
		try {
			setUploading(true);
			if (!file || file.length === 0) {
				throw new Error('You must select an image to upload.');
			}
			const img = file[0];
			const imgName = `${Date.now()}.png`;
			const imgPath = `${imgName}`;

			const { error: uploadError } = await supabase.storage
				.from('guitars')
				.upload(imgPath, img);

			if (uploadError) {
				throw uploadError;
			}
			const { data: urlData } = supabase.storage
				.from('guitars')
				.getPublicUrl(imgPath);
			const fullImgURL = urlData.publicUrl;

			setData({ ...data, main_img: fullImgURL });
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			setError(error.message);
		} finally {
			setUploading(false);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		if (!data.main_img) {
			setError('A photo is required');
			return;
		}
		setLoading(true);
		const { error } = await supabase.from('guitars').update(data).eq('id', id);
		if (error) {
			console.error('Error updating data:', error);
		} else {
			history.push(`/guitars/${id}`);
		}
		setLoading(false);
	};

	const displayBrandName = (id) => {
		const brand = Object.values(brandsRef.current).find(
			(brand) => brand.id === id
		);
		return brand ? brand.name : 'Brand Name';
	};

	const displayUploadButton = () => {
		if (!data.main_img) {
			return 'Upload photo';
		} else if (uploading) {
			return 'Uploading ...';
		} else {
			return 'Change photo';
		}
	};

	const displayPublishButton = () => {
		if (loading) {
			return 'Saving...';
		} else {
			return 'Save';
		}
	};

	const handleCancelClick = () => {
		history.push(`/guitars/${id}`);
	};

	return (
		<>
			{loadingData ? (
				<Spinner />
			) : (
				<Hero
					img={data.main_img ? data.main_img : defaultImg}
					name={data?.name ? data.name : 'There will be a name'}
					brand={displayBrandName(data.brand_id)}
				/>
			)}
			<div className="editor-wrap">
				<Form onSubmit={handleSave}>
					<header className="editor">
						<h1>Edit guitar</h1>
						<div className="edit-header-buttons">
							<Button
								className="cancel-button"
								onPress={handleCancelClick}
								isDisabled={loading}>
								Cancel
							</Button>
							<Button
								className="accent-button"
								type="submit"
								isDisabled={loading}>
								{displayPublishButton()}
							</Button>
						</div>
					</header>
					<div className="product-content-container">
						<div>
							<ProductCard
								guitarData={{
									main_img: data.main_img ? data.main_img : defaultImg,
									name: data?.name ? data.name : 'There will be a name',
									brand: { name: displayBrandName(data.brand_id) },
								}}
							/>
							<FileTrigger
								onSelect={uploadImg}
								acceptedFileTypes={['image/png']}>
								<Button
									className="primary-button"
									style={{ width: '100%', margin: '24px 0' }}
									isDisabled={uploading}>
									{displayUploadButton()}
								</Button>
							</FileTrigger>
							{error && <span className="error">{error}</span>}
							{data.main_img && (
								<Button
									className="cancel-button"
									onPress={() => {
										setData({ ...data, main_img: '' });
									}}
									style={{ width: '100%' }}>
									Delete photo
								</Button>
							)}
						</div>
						<EditorContent
							data={data}
							setData={setData}
						/>
					</div>
				</Form>
			</div>
		</>
	);
}
