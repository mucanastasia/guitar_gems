import { useEditorData } from '../contexts/EditorDataContext';
import { supabase } from '@api/supabaseClient';
import { FileTrigger } from 'react-aria-components';
import { Button } from '@ui/button';
import { TextError } from '@ui/text-error';

export default function PhotoUploader() {
	const { data, setData, uploadingPhoto, setUploadingPhoto, setError, error } =
		useEditorData();

	const uploadImg = async (file) => {
		setError(false);
		try {
			setUploadingPhoto(true);
			if (!file || file.length === 0) {
				throw new Error('You must select an image to upload.');
			}
			const img = file[0];
			const imgName = `${Date.now()}.png`;
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

	const displayUploadButton = () => {
		if (!data.main_img) {
			return 'Upload photo';
		} else if (uploadingPhoto) {
			return 'Uploading ...';
		} else {
			return 'Change photo';
		}
	};

	const handleDeletePhoto = () => {
		setData({ ...data, main_img: '' });
	};

	return (
		<>
			<FileTrigger onSelect={uploadImg} acceptedFileTypes={['image/png']}>
				<Button state="primary" margin="24px 0" disabled={uploadingPhoto}>
					{displayUploadButton()}
				</Button>
			</FileTrigger>
			<TextError>{error}</TextError>
			{data.main_img && (
				<Button state="danger" onClick={handleDeletePhoto}>
					Delete photo
				</Button>
			)}
		</>
	);
}
