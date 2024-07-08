import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Breadcrumbs, Breadcrumb, Link } from 'react-aria-components';
import Hero from './Hero';
import ProductContent from './ProductContent';
import ProductCard from '../catalogue/ProductCard';
import Spinner from '../spinner/Spinner';
import './styles/product.css';
import { useParams } from 'react-router-dom';

export default function Product() {
    const [guitarData, setGuitarData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
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
                    .eq('id', id)
                    .single();

                if (error) throw error;

                setGuitarData(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            {loading
                ? <Spinner />
                : <>
                    <Hero name={guitarData.name} brand={guitarData.brand.name} img={guitarData.main_img} />
                    <div className="product-wrap">
                        <Breadcrumbs>
                            <Breadcrumb><Link href="/">Catalogue</Link></Breadcrumb>
                            <Breadcrumb><Link>{`${guitarData.brand.name} — ${guitarData.name}`}</Link></Breadcrumb>
                        </Breadcrumbs>
                        <div className="product-content-container">
                            <ProductCard guitarData={guitarData} />
                            <ProductContent guitarData={guitarData} />
                        </div>
                    </div>
                </>
            }
        </>
    );
}