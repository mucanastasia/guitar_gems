import { useState, useEffect, useRef } from 'react';
import EditorContent from './EditorContent';
import ProductCard from '../catalogue/ProductCard';
import { Form, Button, FileTrigger } from 'react-aria-components';
import { supabase } from '../../supabaseClient';
import { useHistory } from 'react-router-dom';
import defaultImg from '../../assets/img-placeholder.png';
import Hero from '../product/Hero';
import './styles/editor.css';

export default function Editor() {
    const [data, setData] = useState({
        name: '',
        description: '',
        brand_id: '',
        type_id: '',
        body_material_id: '',
        neck_material_id: '',
        fingerboard_material_id: '',
        release_date: '',
        country_id: '',
        main_img: '',
        features: []
    });
    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const brandsRef = useRef({});
    const guitarIdRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('brands')
                    .select(`id,name`);

                if (error) throw error;

                brandsRef.current = (data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const uploadImg = async (file) => {
        setError(false);
        try {
            setUploading(true);
            if (!file || file.length === 0) {
                throw new Error('You must select an image to upload.');
            }
            const img = file[0];
            const imgName = `${Date.now()}.png`;
            const imgPath = `${imgName}`;

            const { error: uploadError } = await supabase.storage.from('guitars').upload(imgPath, img);

            if (uploadError) {
                throw uploadError
            }
            const { data: urlData } = supabase.storage.from('guitars').getPublicUrl(imgPath);
            const fullImgURL = urlData.publicUrl;

            setData({ ...data, main_img: fullImgURL });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            setError(error.message);
        } finally {
            setUploading(false);
        }
    }

    const handlePublish = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!data.main_img) {
            setError('A photo is required');
            setLoading(false);
            return
        }
        const { data: responseData, error } = await supabase
            .from('guitars')
            .insert([data])
            .select('id');
        if (error) {
            console.error('Error inserting data:', error);
        } else {
            guitarIdRef.current = responseData[0].id;

            history.push(`/guitars/${guitarIdRef.current}`);
        }
        setLoading(false);
    };

    const displayBrandName = (id) => {
        const brand = Object.values(brandsRef.current).find(brand => brand.id === id);
        return brand ? brand.name : 'Brand Name';
    }

    const displayUploadButton = () => {
        if (!data.main_img) {
            return 'Upload photo';
        } else if (uploading) {
            return 'Uploading ...';
        } else {
            return 'Change photo';
        }
    };

    const displayPublishButton = () => {
        if (loading) {
            return 'Publishing...';
        } else if (guitarIdRef.current > 0) {
            return 'Success';
        } else {
            return 'Publish';
        }
    };

    return (
        <>
            <Hero img={data.main_img ? data.main_img : defaultImg} name={data?.name ? data.name : 'There will be a name'} brand={displayBrandName(data.brand_id)} />
            <div className="product-wrap">
                <Form onSubmit={handlePublish}>
                    <header className="editor">
                        <h1>Add guitar</h1>
                        <Button className="accent-button" type="submit" isDisabled={loading} >{displayPublishButton()}</Button>
                    </header>
                    <div className="product-content-container">
                        <div>
                            <ProductCard guitarData={{ main_img: (data.main_img ? data.main_img : defaultImg), name: data?.name ? data.name : 'There will be a name', brand: { name: displayBrandName(data.brand_id) } }} />
                            <FileTrigger onSelect={uploadImg} acceptedFileTypes={['image/png']}>
                                <Button className="primary-button" style={{ width: "100%", margin: "24px 0" }} isDisabled={uploading} >{displayUploadButton()}</Button>
                            </FileTrigger>
                            {error && <span className="error">{error}</span>}
                            {data.main_img && <Button
                                className="cancel-button"
                                onPress={() => { setData({ ...data, main_img: '' }); }}
                                style={{ width: "100%" }} >
                                Delete photo</Button>}
                        </div>
                        <EditorContent data={data} setData={setData} />
                    </div>
                </Form>
            </div>
        </>
    );
}