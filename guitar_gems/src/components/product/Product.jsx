import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Breadcrumbs, Breadcrumb, Link } from 'react-aria-components';
import Hero from './Hero';
import ProductContent from './ProductContent';
import ProductCard from '../catalogue/ProductCard';
import './product.css';

export default function Product({ guitarId }) {
    const [guitarData, setGuitarData] = useState({});
    // const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // setLoading(true);
                const { data, error } = await supabase
                    .from('guitars')
                    .select(`
                            id,
                            name,
                            description,
                            release_date,
                            main_img,
                            brand:brands (
                                id,
                                name
                            ),
                            country:countries(
                                id,
                                name
                            ),
                            type:guitar_types(
                                id,
                                name
                            ),
                            body_material:materials!body_material_id(
                                id,
                                name
                            ),
                            neck_material:materials!neck_material_id(
                                id,
                                name
                            ),
                            fingerboard_material:materials!fingerboard_material_id(
                                id,
                                name
                            ),
                            features:guitar_features(
                                id,
                                description
                            )
                        `)
                    .eq('id', guitarId)
                    .single();

                // console.log(data.brand.name);        // console.log!!!!!!!

                if (error) throw error;

                setGuitarData(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [guitarId]);

    return (
        <>
            {
                errorMessage
                    ? <p>{errorMessage}</p>
                    : <>
                        <Hero name={guitarData.name} brand={guitarData.brand?.name} img={guitarData.main_img} />
                        <div className="product-wrap">
                            <Breadcrumbs>
                                <Breadcrumb><Link href="/">Catalogue</Link></Breadcrumb>
                                <Breadcrumb><Link>{`${guitarData.brand?.name} - ${guitarData.name}`}</Link></Breadcrumb>
                            </Breadcrumbs>
                            <div className="product-content-container">
                                <ProductCard key={guitarData.id} guitarData={guitarData} />
                                <ProductContent guitarData={guitarData} />
                            </div>
                        </div>
                    </>
            }
        </>
    );
}