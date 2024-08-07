import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import Spinner from '../../spinner/Spinner';
import { SelectOptionsProvider } from '../contexts/SelectOptionsContext';

export default function SpecsSection({ children }) {
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
		<article>
			<h2>Specs</h2>
			<SelectOptionsProvider selectOptions={selectOptions}>
				{children}
			</SelectOptionsProvider>
		</article>
	);
}
