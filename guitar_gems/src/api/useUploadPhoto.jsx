import { useMutation } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const uploadPhoto = async ({ imgPath, img }) => {
	const { error } = await supabase.storage.from('guitars').upload(imgPath, img);

	if (error) {
		throw new Error(error.message);
	}
	const { data: urlData } = supabase.storage.from('guitars').getPublicUrl(imgPath);
	const fullImgURL = urlData.publicUrl;
	return fullImgURL;
};

export const useUploadPhoto = () => {
	return useMutation({
		mutationKey: ['uploadPhoto'],
		mutationFn: uploadPhoto,
	});
};
