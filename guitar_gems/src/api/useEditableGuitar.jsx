import { useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';

const getGuitar = async (id) => {
	const { data, error } = await supabase
		.from('guitars')
		.select(
			`
                            id,
                            name,
                            description,
                            release_date,
                            main_img,
                            brand_id,
                            country_id,
                            type_id,
                            body_material_id,
                            neck_material_id,
                            fingerboard_material_id,
                            features
                        `
		)
		.eq('id', id)
		.single();

	if (error) throw new Error(error.message);
	return data;
};

export const useEditableGuitar = (id) => {
	const { data: user, isPending } = useUser();
	const isUserEditor = user?.app_metadata.role === 'editor';

	return useQuery({
		queryKey: ['editable_guitar', id],
		queryFn: () => getGuitar(id),
		enabled: isUserEditor && !isPending,
	});
};
