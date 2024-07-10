import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabaseClient';
import './styles/filtersContainer.css';
import { CheckboxGroup, Checkbox, Label } from 'react-aria-components';
import { CheckboxGroupStateContext } from 'react-aria-components';
import MyDateRangePicker from './MyDateRangePicker';

export default function FiltersContainer({ selected, setSelected }) {
    const [filterNames, setFilterNames] = useState({
        brands: [],
        guitar_types: [],
        materials: [],
        countries: [],
    });

    useEffect(() => {
        const fetchData = async (tableName) => {
            const { data, error } = await supabase
                .from(tableName)
                .select(`
                            id,
                            name
                        `);

            if (error) throw error;
            return data;
        };

        const loadFilters = async () => {
            try {
                let [brands, guitar_types, materials, countries] = await Promise.all([
                    fetchData('brands'),
                    fetchData('guitar_types'),
                    fetchData('materials'),
                    fetchData('countries')
                ]);

                setFilterNames({
                    brands: brands,
                    guitar_types: guitar_types,
                    materials: materials,
                    countries: countries
                });
            } catch (error) {
                console.error(error.message);
            }

        }

        loadFilters();
    }, []);

    function SelectionCount() {
        let state = useContext(CheckboxGroupStateContext);
        return state.value.length;
    }

    return (
        <div className="filters-container">
            <CheckboxGroup onChange={(vals) => { setSelected({ ...selected, brands: vals }) }} value={selected.brands}>
                <Label>Brand {`(`}<SelectionCount />{`)`}</Label>
                {filterNames.brands.map((filter) => (
                    <Checkbox key={filter.id} value={filter.id} >
                        <div className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 18 18"><polyline points="1 9 7 14 15 4" /></svg>
                        </div>
                        {filter.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup onChange={(vals) => { setSelected({ ...selected, types: vals }) }} value={selected.types}>
                <Label>Type {`(`}<SelectionCount />{`)`}</Label>
                {filterNames.guitar_types.map((filter) => (
                    <Checkbox key={filter.id} value={filter.id} >
                        <div className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 18 18"><polyline points="1 9 7 14 15 4" /></svg>
                        </div>
                        {filter.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup onChange={(vals) => { setSelected({ ...selected, materials: vals }) }} value={selected.materials}>
                <Label>Material {`(`}<SelectionCount />{`)`}</Label>
                {filterNames.materials.map((filter) => (
                    <Checkbox key={filter.id} value={filter.id} >
                        <div className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 18 18"><polyline points="1 9 7 14 15 4" /></svg>
                        </div>
                        {filter.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup onChange={(vals) => { setSelected({ ...selected, countries: vals }) }} value={selected.countries}>
                <Label>Country {`(`}<SelectionCount />{`)`}</Label>
                {filterNames.countries.map((filter) => (
                    <Checkbox key={filter.id} value={filter.id} >
                        <div className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 18 18"><polyline points="1 9 7 14 15 4" /></svg>
                        </div>
                        {filter.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>



            <MyDateRangePicker selected={selected} setSelected={setSelected} />
        </div>
    );
}