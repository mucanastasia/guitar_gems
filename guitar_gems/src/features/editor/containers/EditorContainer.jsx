import { useState } from 'react';
import { Editor } from '../components/editor';
import { useEditorData } from '../contexts/EditorDataContext';
import { BRAND_PLACEHOLDER } from '../constants/editor';
import { UploadingStatusProvider } from '../contexts/UploadingStatusContext';
import { useQueryClient } from '@tanstack/react-query';

export function EditorContainer({ handleSubmit }) {
	const { data } = useEditorData();
	const [uploadingPhoto, setUploadingPhoto] = useState(false);

	const queryClient = useQueryClient();
	const brandsList = queryClient.getQueryData(['brands_filters']);

	if (!brandsList) {
		queryClient.fetchQuery({ queryKey: ['brands_filters'] });
	}

	const displayBrandName = (brandId) => {
		if (!brandsList) return BRAND_PLACEHOLDER;
		const brand = Object.values(brandsList).find((brand) => brand.id === brandId);
		return brand ? brand.name : BRAND_PLACEHOLDER;
	};

	const props = {
		handleSubmit,
		displayBrandName,
		brandId: data.brand_id,
		name: data.name,
		image: data.main_img,
		uploadingPhoto,
	};

	return (
		<UploadingStatusProvider
			uploadingPhoto={uploadingPhoto}
			setUploadingPhoto={setUploadingPhoto}>
			<Editor {...props} />
		</UploadingStatusProvider>
	);
}
