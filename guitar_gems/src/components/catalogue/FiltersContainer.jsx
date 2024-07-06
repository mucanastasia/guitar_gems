import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabaseClient';
import './filtersContainer.css';
import { CheckboxGroup, Checkbox, Label } from 'react-aria-components';
import { CheckboxGroupStateContext } from 'react-aria-components';

export default function FiltersContainer() {
    const [filters, setFilters] = useState({
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

                setFilters({
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
            <CheckboxGroup>
                <Label>Brand {`(`}<SelectionCount />{`)`}</Label>
                {filters.brands.map((filter) => (
                    <Checkbox key={filter.id} value={filter.name}>
                        <div className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 18 18"><polyline points="1 9 7 14 15 4" /></svg>
                        </div>
                        {filter.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup>
                <Label>Type {`(`}<SelectionCount />{`)`}</Label>
                {filters.guitar_types.map((filter) => (
                    <Checkbox key={filter.id} value={filter.name}>
                        <div className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 18 18"><polyline points="1 9 7 14 15 4" /></svg>
                        </div>
                        {filter.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup>
                <Label>Material {`(`}<SelectionCount />{`)`}</Label>
                {filters.materials.map((filter) => (
                    <Checkbox key={filter.id} value={filter.name}>
                        <div className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 18 18"><polyline points="1 9 7 14 15 4" /></svg>
                        </div>
                        {filter.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>

            <CheckboxGroup>
                <Label>Country {`(`}<SelectionCount />{`)`}</Label>
                {filters.countries.map((filter) => (
                    <Checkbox key={filter.id} value={filter.name}>
                        <div className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 18 18"><polyline points="1 9 7 14 15 4" /></svg>
                        </div>
                        {filter.name}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </div>
    );
}