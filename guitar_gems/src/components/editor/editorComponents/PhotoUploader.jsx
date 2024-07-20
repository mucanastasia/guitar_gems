import { useEditorData } from '../contexts/EditorDataContext';
import { supabase } from '../../../supabaseClient';
import { Button, FileTrigger } from 'react-aria-components';

export default function MyComponent() {
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

	return (
		<>
			<FileTrigger onSelect={uploadImg} acceptedFileTypes={['image/png']}>
				<Button
					className="primary-button"
					style={{ width: '100%', margin: '24px 0' }}
					isDisabled={uploadingPhoto}>
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
		</>
	);
}
