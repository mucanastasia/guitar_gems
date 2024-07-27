import { useEffect, useState } from 'react';
import { supabase } from '@api/supabaseClient';
import { Spinner } from '@ui/spinner';
import { SelectOptionsProvider } from '../contexts/SelectOptionsContext';

export function SpecsContainer({ children }) {
	const [loading, setLoading] = useState(true);
	const [selectOptions, setSelectOptions] = useState({
		brands: [],
		guitar_types: [],
		materials: [],
		countries: [],
	});

	useEffect(() => {
		const fetchData = async (tableName) => {
			try {
				const { data, error } = await supabase.from(tableName).select(`
                                id,
                                name
                            `);
				if (error) throw error;
				return data;
			} catch (error) {
				console.log(error.message);
				throw error;
			}
		};

		const loadSelectOptions = async () => {
			try {
				setLoading(true);
				const [brands, guitar_types, materials, countries] = await Promise.all([
					fetchData('brands'),
					fetchData('guitar_types'),
					fetchData('materials'),
					fetchData('countries'),
				]);

				setSelectOptions({
					brands: brands,
					guitar_types: guitar_types,
					materials: materials,
					countries: countries,
				});
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		loadSelectOptions();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<SelectOptionsProvider selectOptions={selectOptions}>
			{children}
		</SelectOptionsProvider>
	);
}
