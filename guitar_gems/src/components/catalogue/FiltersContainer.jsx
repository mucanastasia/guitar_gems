import { useState, useEffect, useContext } from 'react';
import { supabase } from '@api/supabaseClient';
import { CheckboxGroupStateContext } from 'react-aria-components';
import { useFilters } from './contexts/FiltersContext';
import { Spinner } from '@ui/spinner';
import './styles/filtersContainer.css';
import { FilterGroup } from '@ui/filter-group';
import { getLocalTimeZone, today } from '@internationalized/date';
import { DateRangePicker } from '@ui/date-range-picker';

export default function FiltersContainer({ setFilters }) {
	const { selectedFilters } = useFilters();

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
				setLoading(false);
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

	const todayDate = today(getLocalTimeZone());

	const handleChangeDates = (e) => {
		setFilters({ ...selectedFilters, date: e });
	};

	const handleResetDates = () => {
		setFilters({ ...selectedFilters, date: { start: null, end: null } });
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="filters-container">
			<>
				<FilterGroup
					label="Brand"
					filters={filterNames.brands}
					onChange={handleChangeBrand}
					selectedFilters={selectedFilters.brands}
					Counter={SelectionCount}
				/>
				<FilterGroup
					label="Type"
					filters={filterNames.types}
					onChange={handleChangeType}
					selectedFilters={selectedFilters.types}
					Counter={SelectionCount}
				/>

				<FilterGroup
					label="Material"
					filters={filterNames.materials}
					onChange={handleChangeMaterial}
					selectedFilters={selectedFilters.materials}
					Counter={SelectionCount}
				/>

				<FilterGroup
					label="Country"
					filters={filterNames.countries}
					onChange={handleChangeCountry}
					selectedFilters={selectedFilters.countries}
					Counter={SelectionCount}
				/>

				<DateRangePicker
					value={selectedFilters.date}
					maxValue={todayDate}
					onChange={handleChangeDates}
					onClear={handleResetDates}
				/>
			</>
		</div>
	);
}
