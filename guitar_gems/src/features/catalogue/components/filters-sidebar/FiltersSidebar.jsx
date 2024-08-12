import { FilterGroup } from '@ui/filter-group';
import { DateRangePicker } from '@ui/date-range-picker';
import * as labels from '@features/product/constants/specNames';
import './FiltersSidebar.css';

export function FiltersSidebar({ ...props }) {
	const {
		brands,
		types,
		materials,
		countries,
		selectedFilters,
		handleChangeBrand,
		handleChangeType,
		handleChangeMaterial,
		handleChangeCountry,
		handleChangeDates,
		handleResetDates,
		SelectionCount,
		todayDate,
	} = props;

	return (
		<div className="filters-container">
			<FilterGroup
				label={labels.SPEC_LABEL_BRAND}
				filters={brands}
				onChange={handleChangeBrand}
				selectedFilters={selectedFilters.brands}
				Counter={SelectionCount}
			/>
			<FilterGroup
				label={labels.SPEC_LABEL_TYPE}
				filters={types}
				onChange={handleChangeType}
				selectedFilters={selectedFilters.types}
				Counter={SelectionCount}
			/>

			<FilterGroup
				label={labels.SPEC_LABEL_MATERIAL}
				filters={materials}
				onChange={handleChangeMaterial}
				selectedFilters={selectedFilters.materials}
				Counter={SelectionCount}
			/>

			<FilterGroup
				label={labels.SPEC_LABEL_COUNTRY}
				filters={countries}
				onChange={handleChangeCountry}
				selectedFilters={selectedFilters.countries}
				Counter={SelectionCount}
			/>

			<DateRangePicker
				label={labels.SPEC_LABEL_RELEASE_DATE}
				value={selectedFilters.date}
				maxValue={todayDate}
				onChange={handleChangeDates}
				onClear={handleResetDates}
			/>
		</div>
	);
}
