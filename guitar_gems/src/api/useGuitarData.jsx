import { useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';
import { useUser } from '@api/useUser';

const getGuitar = async (guitarId, userId) => {
	await new Promise((resolve) => setTimeout(resolve, 200));
	let query = supabase
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
                            ${userId ? ',favourites (id)' : ''}
                        `
		)
		.eq('id', guitarId);

	if (userId) {
		query = query.eq('favourites.user_id', userId);
	}

	const { data, error } = await query.single();

	if (error) throw new Error(error.message);

	const isFavourite = userId ? data.favourites.length > 0 : false;

	return { ...data, isFavourite };
};

export const useGuitarData = (guitarId) => {
	const { data: user } = useUser();

	return useQuery({
		queryKey: ['data_guitar', guitarId],
		queryFn: () => getGuitar(guitarId, user?.id),
		enabled: !!guitarId,
		refetchOnMount: true,
	});
};
