import { useEffect, useRef, useState } from 'react';
import { Editor } from '../components/editor';
import { useEditorData } from '../contexts/EditorDataContext';
import { supabase } from '@api/supabaseClient';
import { BRAND_PLACEHOLDER } from '../constants/editor';
import { Spinner } from '@ui/spinner';

export function EditorContainer({ handleSubmit }) {
	const brandsRef = useRef({});
	const { data, loading } = useEditorData();
	const [uploadingPhoto, setUploadingPhoto] = useState(false);

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
		return brand ? brand.name : BRAND_PLACEHOLDER;
	};

	const props = {
		handleSubmit,
		displayBrandName,
		uploadingPhoto,
		setUploadingPhoto,
		brandId: data.brand_id,
		name: data.name,
		image: data.main_img,
	};

	if (loading) {
		return <Spinner />;
	}

	return <Editor {...props} />;
}
