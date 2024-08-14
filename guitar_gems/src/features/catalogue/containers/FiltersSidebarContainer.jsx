import { useContext } from 'react';
import { CheckboxGroupStateContext } from 'react-aria-components';
import { useSelectedFilters } from '../contexts/SelectedFiltersContext';
import { getLocalTimeZone, today } from '@internationalized/date';
import { SkeletonFilters } from '@ui/skeleton';
import { FiltersSidebar } from '../components/filters-sidebar';
import { useFilters } from '@api/useFilters';
import { useUrlState } from '../helpers/useUrlState';

export function FiltersSidebarContainer() {
	const { selectedFilters, setSelectedFilters } = useSelectedFilters();
	const { updateURL } = useUrlState();

	const { data: filterNames, isPending } = useFilters();

	function SelectionCount() {
		let state = useContext(CheckboxGroupStateContext);
		return state.value.length;
	}

	const updateFilters = (key, vals) => {
		const newFilters = { ...selectedFilters, [key]: vals };
		setSelectedFilters(newFilters);
		updateURL(newFilters);
	};

	const handleChangeBrand = (vals) => {
		updateFilters('brands', vals);
	};

	const handleChangeType = (vals) => {
		updateFilters('types', vals);
	};

	const handleChangeMaterial = (vals) => {
		updateFilters('materials', vals);
	};

	const handleChangeCountry = (vals) => {
		updateFilters('countries', vals);
	};

	const handleChangeDates = (vals) => {
		updateFilters('date', vals);
	};

	const handleResetDates = () => {
		const vals = { start: null, end: null };
		updateFilters('date', vals);
	};

	const todayDate = today(getLocalTimeZone());

	const props = {
		brands: filterNames?.brands,
		types: filterNames?.types,
		materials: filterNames?.materials,
		countries: filterNames?.countries,
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

	if (isPending) {
		return <SkeletonFilters />;
	}

	return <FiltersSidebar {...props} />;
}
