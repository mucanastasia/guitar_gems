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
            <Link key={guitar.id} to={`/guitar_gems/guitars/${guitar.id}`}><ProductCard guitarData={guitar} /></Link>
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