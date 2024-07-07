import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ProductCard from './ProductCard';
import './styles/catalogue.css';
import FiltersContainer from './FiltersContainer';
import CatalogueHeader from './CatalogueHeader';
import Skeleton from '../spinner/Skeleton';

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

    const renderCatalogue = () => {
        if (!guitars || guitars.length === 0) {
            return <p>No guitars available.</p>;
        }

        return guitars.map((guitar) => (
            <ProductCard key={guitar.id} guitarData={guitar} />
        ));
    };

    return (
        <>
            <CatalogueHeader />
            <div className="container">
                <FiltersContainer />
                <div className="catalogue-container">
                    {loading
                        ? <Skeleton />
                        : renderCatalogue()
                    }
                </div>
            </div>
        </>
    );
}