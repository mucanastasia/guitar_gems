import { useQueries, useQuery } from '@tanstack/react-query';
import { supabase } from '@api/supabaseClient';

const getGuitar = async (guitarId) => {
	const { data, error } = await supabase
		.from('guitars')
		.select(
			`
                            id,
                            name,
                            release_date,
                            main_img,
                            brand:brands (
                                name
                            ),
                            country:countries(
                                name
                            ),
                            type:guitar_types(
                                name
                            ),
                            body_material:materials!body_material_id(
                                name
                            ),
                            neck_material:materials!neck_material_id(
                                name
                            ),
                            fingerboard_material:materials!fingerboard_material_id(
                                name
                            ),
                            features
                        `
		)
		.eq('id', guitarId)
		.single();

	if (error) throw new Error(error.message);

	return data;
};

export const useCompareGuitars = (guitarIds) => {
	const guitarsQueries = useQueries({
		queries: guitarIds.map((guitarId) => ({
			queryKey: ['comparison_guitar', guitarId],
			queryFn: () => getGuitar(guitarId),
			enabled: !!guitarId,
			refetchOnMount: true,
		})),
		combine: (results) => {
			const data = results.map((result) => result.data);
			return {
				data,
				isPending: results.some((result) => result.isPending),
				isError: results.some((result) => result.isError),
			};
		},
	});

	return guitarsQueries;
};
