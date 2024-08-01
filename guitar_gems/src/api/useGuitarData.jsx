import { useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

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
                            brand:brands (
                                id,
                                name
                            ),
                            country:countries(
                                id,
                                name
                            ),
                            type:guitar_types(
                                id,
                                name
                            ),
                            body_material:materials!body_material_id(
                                id,
                                name
                            ),
                            neck_material:materials!neck_material_id(
                                id,
                                name
                            ),
                            fingerboard_material:materials!fingerboard_material_id(
                                id,
                                name
                            ),
                            features
                        `
		)
		.eq('id', id)
		.single();

	if (error) throw new Error(error.message);
	return data;
};

export const useGuitarData = (id) => {
	return useQuery({
		queryKey: ['guitarData', id],
		queryFn: () => getGuitar(id),
	});
};
