import { Hero } from '@ui/hero';
import { Spinner } from '@ui/spinner';
import { IMG_PLACEHOLDER_URL, NAME_PLACEHOLDER } from '../constants/editor';
import { useUploadingPhoto } from '../contexts/UploadingPhotoContext';

export function EditorHeroContainer({ displayBrandName, image, name, brandId }) {
	const { uploadingPhoto } = useUploadingPhoto();

	if (uploadingPhoto) {
		return <Spinner />;
	}

	return (
		<Hero
			img={image ? image : IMG_PLACEHOLDER_URL}
			name={name ? name : NAME_PLACEHOLDER}
			brand={displayBrandName(brandId)}
		/>
	);
}
