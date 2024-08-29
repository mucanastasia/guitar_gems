import { useMutation } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const convertToWebP = async (imageFile) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(
				(blob) => {
					resolve(blob);
				},
				'image/webp',
				0.8
			);
		};
		img.onerror = reject;
		img.src = URL.createObjectURL(imageFile);
	});
};

const uploadPhoto = async ({ imgPath, img }) => {
	const webPImage = await convertToWebP(img);

	const { error } = await supabase.storage.from('guitars').upload(imgPath, webPImage, {
		contentType: 'image/webp',
	});

	if (error) {
		throw new Error(error.message);
	}
	const { data: urlData } = supabase.storage.from('guitars').getPublicUrl(imgPath);
	return urlData.publicUrl;
};

export const useUploadPhoto = () => {
	return useMutation({
		mutationKey: ['uploadPhoto'],
		mutationFn: uploadPhoto,
	});
};
