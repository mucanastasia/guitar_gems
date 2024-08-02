import { useContext } from 'react';
import { CheckboxGroupStateContext } from 'react-aria-components';
import { useSelectedFilters } from '@features/catalogue/contexts/SelectedFiltersContext';
import { getLocalTimeZone, today } from '@internationalized/date';
import { SkeletonFilters } from '@ui/skeleton';
import { FiltersSidebar } from '@features/catalogue/components/filters-sidebar';
import { useFilters } from '@api/useFilters';

export function FiltersSidebarContainer() {
	const { selectedFilters, setSelectedFilters } = useSelectedFilters();

	const { data: filterNames, isPending } = useFilters();

	function SelectionCount() {
		let state = useContext(CheckboxGroupStateContext);
		return state.value.length;
	}

	const handleChangeBrand = (vals) => {
		setSelectedFilters({ ...selectedFilters, brands: vals });
	};

	const handleChangeType = (vals) => {
		setSelectedFilters({ ...selectedFilters, types: vals });
	};

	const handleChangeMaterial = (vals) => {
		setSelectedFilters({ ...selectedFilters, materials: vals });
	};

	const handleChangeCountry = (vals) => {
		setSelectedFilters({ ...selectedFilters, countries: vals });
	};

	const handleChangeDates = (vals) => {
		setSelectedFilters({ ...selectedFilters, date: vals });
	};

	// TODO: Tried to unite all handlers above into one, but failed. Need to investigate or leave handlers as they are.
	// const handleChangeFilter = (vals, filterKey) => {
	// 	setSelectedFilters({ ...selectedFilters, [filterKey]: vals });
	// };

	const todayDate = today(getLocalTimeZone());

	const handleResetDates = () => {
		setSelectedFilters({ ...selectedFilters, date: { start: null, end: null } });
	};

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
