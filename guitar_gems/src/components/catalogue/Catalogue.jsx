import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import FiltersContainer from './FiltersContainer';
import CatalogueHeader from './CatalogueHeader';
import Skeleton from '../spinner/Skeleton';
import './styles/catalogue.css';

export default function Catalogue() {
    const [guitars, setGuitars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('guitars')
                    .select(`
                                id,
                                name,
                                main_img,
                                brand:brands (
                                    id,
                                    name
                                )
                            `);

                console.log('Initial load', data);                          //CONSOLE.LOG!!!!!!!!!!!!

                if (error) throw error;

                setGuitars(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [selectedFilters, setSelectedFilters] = useState({
        brands: [],
        types: [],
        materials: [],
        countries: [],
        date: { start: null, end: null },
    });

    const prepareFilter = (selectedList, fieldNames) => {
        const filter = selectedList?.map((id) => (fieldNames
            .map((fieldName) => (`${fieldName}.eq.${id}`))
            .join(',')))
            .join(',');
        return filter;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let request = supabase
                    .from('guitars')
                    .select(`
                            id,
                            name,
                            main_img,
                            brand:brands (
                                id,
                                name
                            )
                    `);

                if (selectedFilters.brands.length > 0) {
                    request = request.or(prepareFilter(selectedFilters.brands, ['brand_id']));
                }
                if (selectedFilters.types.length > 0) {
                    request = request.or(prepareFilter(selectedFilters.types, ['type_id']));
                }
                if (selectedFilters.materials.length > 0) {
                    request = request.or(prepareFilter(selectedFilters.materials, ['body_material_id', 'neck_material_id', 'fingerboard_material_id']));
                }
                if (selectedFilters.countries.length > 0) {
                    request = request.or(prepareFilter(selectedFilters.countries, ['country_id']));
                }
                if (selectedFilters.date.start && selectedFilters.date.end) {
                    request.gte('release_date', selectedFilters.date?.start.toLocaleString('en-GB'));
                    request.lte('release_date', selectedFilters.date?.end.toLocaleString('en-GB'));
                }

                console.log('Selected Filters: ', selectedFilters);
                // If you select the brand filter: Fender and Gibson, the result will be Fender <OR> Gibson.
                // If you select the brand filter: Fender and the type filter: Electric, the result will be Fender <AND> Electric.
                // Therefore, within a filter category, it's a logical OR, but across different filter categories, it's a logical AND.

                const { data, error } = await request;

                //console.log(data);
                if (error) throw error;

                setGuitars(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [selectedFilters]);

    const renderCatalogue = () => {
        if (!guitars || guitars.length === 0) {
            return <p>No guitars available.</p>;
        }

        return guitars.map((guitar) => (
            <Link key={guitar.id} to={`/guitars/${guitar.id}`}><ProductCard guitarData={guitar} /></Link>
        ));
    };

    return (
        <>
            <CatalogueHeader />
            <div className="container">
                <FiltersContainer selected={selectedFilters} setSelected={setSelectedFilters} />
                <div className="catalogue-container">
                    {loading
                        ? <Skeleton count={guitars.length} />
                        : renderCatalogue()
                    }
                </div>
            </div>
        </>
    );
}




// Brands
//     .from('guitars')
//     .select(`
//             id,
//             name,
//             main_img,
//             brand:brands!inner (
//                 id,
//                 name
//             )
//         `)
//     .eq('brand.name', 'Fender');

// Types
//     .from('guitars')
//     .select(`
//         id,
//         name,
//         main_img,
//         brand:brands (
//             id,
//             name
//         ),
//         type:guitar_types!inner(
//             id,
//             name
//         )
//     `)
//     .eq('type.id', 3);

//Country
// .from('guitars')
// .select(`
//         id,
//         name,
//         main_img,
//         brand:brands (
//             id,
//             name
//         ),
//         country:countries!inner(
//             id,
//             name
//         )
//     `)
// .eq('country.id', 3);


//Material
// .from('guitars')
// .select(`
//         id,
//         name,
//         main_img,
//         brand:brands (
//             id,
//             name
//         ),
//         body_material:materials!body_material_id!inner(
//             id,
//             name
//         ),
//         neck_material:materials!neck_material_id!inner(
//             id,
//             name
//         ),
//         fingerboard_material:materials!fingerboard_material_id!inner(
//             id,
//             name
//         )
//     `)
// .or(`body_material_id.eq.${2},neck_material_id.eq.${2},fingerboard_material_id.eq.${2}`);

//Range date
// .from('guitars')
// .select(`
//         id,
//         name,
//             release_date,
//         main_img,
//         brand:brands (
//             id,
//             name
//         )
//     `)
// .gte('release_date', '2023-01-01')
// .lte('release_date', '2024-07-01');