import { useEditorData } from '../contexts/EditorDataContext';
import { Button } from '@ui/button';
import { FileTrigger } from 'react-aria-components';
import { TextError } from '@ui/text-error';
import { useUploadPhoto } from '@api/useUploadPhoto';
import { useUploadingStatus } from '../contexts/UploadingStatusContext';

export function PhotoUploaderContainer() {
	const { data, setData, setError, error } = useEditorData();
	const { main_img } = data;
	const { setUploadingPhoto } = useUploadingStatus();

	const { mutate, isPending } = useUploadPhoto();

	const handleUploadPhoto = async (file) => {
		setError(false);
		if (!file || file.length === 0) {
			setError('You must select an image to upload');
			return;
		}
		const img = file[0];
		const imgExtension = img.name.split('.').pop();
		if (!['png', 'webp'].includes(imgExtension.toLowerCase())) {
			setError('Only PNG and WebP files are allowed');
			return;
		}
		setUploadingPhoto(true);
		const imgName = `${Date.now()}.webp`;
		const imgPath = `${imgName}`;
		await mutate(
			{ imgPath, img },
			{
				onSuccess: (fullImgURL) => {
					setData({ ...data, main_img: fullImgURL });
					window.scrollTo({ top: 0, behavior: 'smooth' });
				},
				onError: (mutationError) => {
					setError(mutationError.message);
				},
			}
		);
		setTimeout(() => {
			setUploadingPhoto(false);
		}, 1800);
	};

	const handleDeletePhoto = () => {
		setData({ ...data, main_img: '' });
	};

	return (
		<>
			<FileTrigger
				onSelect={handleUploadPhoto}
				acceptedFileTypes={['image/png', 'image/webp']}>
				<Button state="primary" margin="24px 0" disabled={isPending}>
					{isPending ? 'Uploading ...' : main_img ? 'Change photo' : 'Upload photo'}
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
