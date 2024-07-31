import { useEditorData } from '../contexts/EditorDataContext';
import { supabase } from '@api/supabaseClient';
import { useUploadingPhoto } from '../contexts/UploadingPhotoContext';
import { Button } from '@ui/button';
import { FileTrigger } from 'react-aria-components';
import { TextError } from '@ui/text-error';

export function PhotoUploaderContainer() {
	const { data, setData, setError, error } = useEditorData();
	const { uploadingPhoto, setUploadingPhoto } = useUploadingPhoto();
	const { main_img } = data;

	const uploadPhoto = async (file) => {
		setError(false);
		try {
			if (!file || file.length === 0) {
				throw new Error('You must select an image to upload');
			}
			const img = file[0];
			const imgExtension = img.name.split('.').pop();
			if (!['png', 'webp'].includes(imgExtension.toLowerCase())) {
				throw new Error('Only PNG and WebP files are allowed');
			}
			setUploadingPhoto(true);
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

	const displayUploadButton = () => {
		if (!main_img) return 'Upload photo';
		return uploadingPhoto ? 'Uploading ...' : 'Change photo';
	};

	return (
		<>
			<FileTrigger onSelect={uploadPhoto} acceptedFileTypes={['image/png', 'image/webp']}>
				<Button state="primary" margin="24px 0" disabled={uploadingPhoto}>
					{displayUploadButton()}
				</Button>
			</FileTrigger>
			<TextError>{error}</TextError>
			{main_img && (
				<Button state="danger" onClick={handleDeletePhoto}>
					Delete photo
				</Button>
			)}
		</>
	);
}
