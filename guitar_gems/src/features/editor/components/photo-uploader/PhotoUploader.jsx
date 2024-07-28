import { Button } from '@ui/button';
import { FileTrigger } from 'react-aria-components';
import { TextError } from '@ui/text-error';

export function PhotoUploader({ ...props }) {
	const { img, uploadingPhoto, uploadPhoto, handleDeletePhoto, error } = props;

	const displayUploadButton = () => {
		if (!img) return 'Upload photo';
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
			{img && (
				<Button state="danger" onClick={handleDeletePhoto}>
					Delete photo
				</Button>
			)}
		</>
	);
}
