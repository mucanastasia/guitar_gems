import { useState, useEffect, useContext } from 'react';
import { supabase } from '@api/supabaseClient';
import { CheckboxGroupStateContext } from 'react-aria-components';
import { useFilters } from '@features/catalogue/contexts/FiltersContext';
import { getLocalTimeZone, today } from '@internationalized/date';
import { SkeletonFilters } from '@ui/skeleton';
import { FiltersSidebar } from '@features/catalogue/components/filters-sidebar';
import { useGuitars } from '../contexts/GuitarsContext';

export function FiltersSidebarContainer() {
	const { selectedFilters } = useFilters();
	const { setFilters } = useGuitars();

	const [loading, setLoading] = useState(true);
	const [filterNames, setFilterNames] = useState({
		brands: [],
		types: [],
		materials: [],
		countries: [],
	});

	useEffect(() => {
		const fetchData = async (tableName) => {
			setLoading(true);
			try {
				const { data, error } = await supabase.from(tableName).select(`
                            id,
                            name
                        `);

				if (error) throw error;
				return data;
			} catch (error) {
				console.error(error.message);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 300);
			}
		};

		const loadFilters = async () => {
			try {
				let [brands, guitar_types, materials, countries] = await Promise.all([
					fetchData('brands'),
					fetchData('guitar_types'),
					fetchData('materials'),
					fetchData('countries'),
				]);

				setFilterNames({
					brands: brands,
					types: guitar_types,
					materials: materials,
					countries: countries,
				});
			} catch (error) {
				console.error(error.message);
			}
		};

		loadFilters();
	}, []);

	function SelectionCount() {
		let state = useContext(CheckboxGroupStateContext);
		return state.value.length;
	}

	const handleChangeBrand = (vals) => {
		setFilters({ ...selectedFilters, brands: vals });
	};

	const handleChangeType = (vals) => {
		setFilters({ ...selectedFilters, types: vals });
	};

	const handleChangeMaterial = (vals) => {
		setFilters({ ...selectedFilters, materials: vals });
	};

	const handleChangeCountry = (vals) => {
		setFilters({ ...selectedFilters, countries: vals });
	};

	const handleChangeDates = (vals) => {
		setFilters({ ...selectedFilters, date: vals });
	};

	// TODO: Tried to unite all handlers above into one, but failed. Need to investigate or leave handlers as they are.
	// const handleChangeFilter = (vals, filterKey) => {
	// 	setFilters({ ...selectedFilters, [filterKey]: vals });
	// };

	const todayDate = today(getLocalTimeZone());

	const handleResetDates = () => {
		setFilters({ ...selectedFilters, date: { start: null, end: null } });
	};

	const props = {
		brands: filterNames.brands,
		types: filterNames.types,
		materials: filterNames.materials,
		countries: filterNames.countries,
		selectedFilters,
		handleChangeBrand,
		handleChangeType,
		handleChangeMaterial,
		handleChangeCountry,
		handleChangeDates,
		handleResetDates,
		SelectionCount,
		todayDate,
	};

	if (loading) {
		return <SkeletonFilters />;
	}

	return <FiltersSidebar {...props} />;
}
