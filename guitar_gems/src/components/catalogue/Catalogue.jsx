import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ProductCard from './ProductCard';
import './catalogue.css';

export default function Catalogue() {
    const [guitars, setGuitars] = useState([]);
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
                            main_img,
                            brand:brands (
                                id,
                                name
                            )
                        `);

                if (error) throw error;

                setGuitars(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                // setLoading(false);
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
            {
                errorMessage
                    ? <p>{errorMessage}</p>
                    : <div className="catalogue-container">
                        {renderCatalogue()}
                    </div>
            }
        </>
    );
}