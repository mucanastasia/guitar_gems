import { useEditorData } from '../contexts/EditorDataContext';
import { supabase } from '@api/supabaseClient';
import { PhotoUploader } from '../components/photo-uploader/PhotoUploader';
import { useUploadingPhoto } from '../contexts/UploadingPhotoContext';

export function PhotoUploaderContainer() {
	const { data, setData, setError, error } = useEditorData();
	const { uploadingPhoto, setUploadingPhoto } = useUploadingPhoto();

	const uploadPhoto = async (file) => {
		setError(false);
		try {
			setUploadingPhoto(true);
			if (!file || file.length === 0) {
				throw new Error('You must select an image to upload');
			}
			const img = file[0];
			const imgExtension = img.name.split('.').pop();
			if (!['png', 'webp'].includes(imgExtension.toLowerCase())) {
				throw new Error('Only PNG and WebP files are allowed');
			}
			const imgName = `${Date.now()}.${imgExtension}`;
			const imgPath = `${imgName}`;

			const { error } = await supabase.storage.from('guitars').upload(imgPath, img);

			if (error) {
				throw error;
			}
			const { data: urlData } = supabase.storage.from('guitars').getPublicUrl(imgPath);
			const fullImgURL = urlData.publicUrl;

			setData({ ...data, main_img: fullImgURL });
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			setError(error.message);
		} finally {
			setUploadingPhoto(false);
		}
	};

	const handleDeletePhoto = () => {
		setData({ ...data, main_img: '' });
	};

	const props = {
		img: data.main_img,
		uploadingPhoto,
		uploadPhoto,
		handleDeletePhoto,
		error,
	};

	return <PhotoUploader {...props} />;
}
