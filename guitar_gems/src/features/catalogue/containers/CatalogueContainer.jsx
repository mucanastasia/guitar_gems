import { useState } from 'react';
import { supabase } from '@api/supabaseClient';
import { CARDS_PER_PAGE } from '../constants/catalogue';
import { prepareFilter } from '../helpers/filterHelpers';
import { Catalogue } from '../components/catalogue/Catalogue';
import { GuitarsProvider } from '../contexts/GuitarsContext';
import { useFilters } from '../contexts/FiltersContext';
import { useWindowWidth } from '@helpers/useWindowWidth';

export function CatalogueContainer() {
	const [guitars, setGuitars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);

	const { selectedFilters, setSelectedFilters } = useFilters();
	const isMobile = useWindowWidth();

	const handleFilterChange = async (newFilters) => {
		setSelectedFilters(newFilters);
		await fetchGuitars(newFilters, true);
	};

	const fetchGuitars = async (filters = selectedFilters, reset = false) => {
		try {
			setLoading(true);

			if (reset) {
				setGuitars([]);
			}

			await new Promise((resolve) => setTimeout(resolve, 300));

			let request = supabase
				.from('searchable_guitars')
				.select(
					`
						id,
						name,
						main_img,
						brand_name
                    `
				)
				.order('id', { ascending: true })
				.limit(CARDS_PER_PAGE);

			if (filters.brands.length > 0) {
				request = request.or(prepareFilter(filters.brands, ['brand_id']));
			}
			if (filters.types.length > 0) {
				request = request.or(prepareFilter(filters.types, ['type_id']));
			}
			if (filters.materials.length > 0) {
				request = request.or(
					prepareFilter(filters.materials, [
						'body_material_id',
						'neck_material_id',
						'fingerboard_material_id',
					])
				);
			}
			if (filters.countries.length > 0) {
				request = request.or(prepareFilter(filters.countries, ['country_id']));
			}
			if (filters.date.start && filters.date.end) {
				request.gte('release_date', filters.date?.start.toLocaleString('en-GB'));
				request.lte('release_date', filters.date?.end.toLocaleString('en-GB'));
			}

			if (filters.query.length > 0) {
				request.or(
					`name.ilike.%${filters.query}%,full_text_search.wfts.${filters.query},brand_name.ilike.%${filters.query}%,type_name.ilike.%${filters.query}%,body_material_name.ilike.%${filters.query}%,neck_material_name.ilike.%${filters.query}%,fingerboard_material_name.ilike.%${filters.query}%,country_name.ilike.%${filters.query}%`
				);
			}

			if (!reset && guitars.length > 0) {
				const lastGuitarId = guitars[guitars.length - 1].id;
				request.gt('id', lastGuitarId);
			}

			const { data, error } = await request;

			if (error) throw error;

			setGuitars(reset ? data : [...guitars, ...data]);

			if (data.length < CARDS_PER_PAGE) {
				setHasMore(false);
			} else {
				setHasMore(true);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const props = {
		guitars,
		loading,
		fetchGuitars,
		setFilters: handleFilterChange,
		hasMore,
		setHasMore,
	};

	return (
		<GuitarsProvider {...props}>
			<Catalogue isMobile={isMobile} />
		</GuitarsProvider>
	);
}
