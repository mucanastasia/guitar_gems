import { Hero } from '@ui/hero';
import { Spinner } from '@ui/spinner';
import { IMG_PLACEHOLDER_URL, NAME_PLACEHOLDER } from '../constants/editor';
import { useUploadingStatus } from '../contexts/UploadingStatusContext';

export function EditorHeroContainer({ displayBrandName, image, name, brandId }) {
	const { uploadingPhoto } = useUploadingStatus();

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
