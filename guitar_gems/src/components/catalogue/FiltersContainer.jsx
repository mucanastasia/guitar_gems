import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabaseClient';
import { CheckboxGroup, Checkbox, Label } from 'react-aria-components';
import { CheckboxGroupStateContext } from 'react-aria-components';
import { useFilters } from './contexts/FiltersContext';
import MyDateRangePicker from './MyDateRangePicker';
import Spinner from '../spinner/Spinner';
import './styles/filtersContainer.css';

export default function FiltersContainer({ setFilters }) {
	const { selectedFilters } = useFilters();

	const [loading, setLoading] = useState(true);
	const [filterNames, setFilterNames] = useState({
		brands: [],
		guitar_types: [],
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
					guitar_types: guitar_types,
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

	return (
		<div className="filters-container">
			{loading ? (
				<Spinner />
			) : (
				<>
					<CheckboxGroup
						onChange={handleChangeBrand}
						value={selectedFilters.brands}>
						<Label>
							Brand {`(`}
							<SelectionCount />
							{`)`}
						</Label>
						{filterNames.brands.map((filter) => (
							<Checkbox key={filter.id} value={filter.id}>
								<div className="checkbox" aria-hidden="true">
									<svg viewBox="0 0 18 18">
										<polyline points="1 9 7 14 15 4" />
									</svg>
								</div>
								{filter.name}
							</Checkbox>
						))}
					</CheckboxGroup>

					<CheckboxGroup
						onChange={handleChangeType}
						value={selectedFilters.types}>
						<Label>
							Type {`(`}
							<SelectionCount />
							{`)`}
						</Label>
						{filterNames.guitar_types.map((filter) => (
							<Checkbox key={filter.id} value={filter.id}>
								<div className="checkbox" aria-hidden="true">
									<svg viewBox="0 0 18 18">
										<polyline points="1 9 7 14 15 4" />
									</svg>
								</div>
								{filter.name}
							</Checkbox>
						))}
					</CheckboxGroup>

					<CheckboxGroup
						onChange={handleChangeMaterial}
						value={selectedFilters.materials}>
						<Label>
							Material {`(`}
							<SelectionCount />
							{`)`}
						</Label>
						{filterNames.materials.map((filter) => (
							<Checkbox key={filter.id} value={filter.id}>
								<div className="checkbox" aria-hidden="true">
									<svg viewBox="0 0 18 18">
										<polyline points="1 9 7 14 15 4" />
									</svg>
								</div>
								{filter.name}
							</Checkbox>
						))}
					</CheckboxGroup>

					<CheckboxGroup
						onChange={handleChangeCountry}
						value={selectedFilters.countries}>
						<Label>
							Country {`(`}
							<SelectionCount />
							{`)`}
						</Label>
						{filterNames.countries.map((filter) => (
							<Checkbox key={filter.id} value={filter.id}>
								<div className="checkbox" aria-hidden="true">
									<svg viewBox="0 0 18 18">
										<polyline points="1 9 7 14 15 4" />
									</svg>
								</div>
								{filter.name}
							</Checkbox>
						))}
					</CheckboxGroup>

					<MyDateRangePicker setFilters={setFilters} />
				</>
			)}
		</div>
	);
}
