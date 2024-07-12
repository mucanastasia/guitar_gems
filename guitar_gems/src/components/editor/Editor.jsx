import { useState, useEffect, useRef } from 'react';
import EditorContent from './EditorContent';
import ProductCard from '../catalogue/ProductCard';
import { Form, Button, FileTrigger } from 'react-aria-components';
import defaultImg from '../../assets/img-placeholder.png';
import Hero from '../product/Hero';
import './styles/editor.css';

export default function Editor() {
    const fileRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [data, setData] = useState({
        name: '',
        description: '',
        brand: '',
        type: '',
        body: '',
        neck: '',
        fingerboard: '',
        release_date: '',
        country: '',
        img_URL: '',
    });

    console.log(data);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleFileSelect = (files) => {
        const selectedFile = files[0];
        fileRef.current = selectedFile;
        setPreview(URL.createObjectURL(selectedFile));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('File INFO: ', selectedFile);
    };

    const handlePublish = (e) => {
        e.preventDefault();
        console.log('Publish button clicked');
        if (!fileRef.current) {
            setError('A photo is required');
            console.log('Not publish!');
        } else {
            console.log('Published');
        }
    };

    const displayBrandName = (id) => {
        if (id === 1) return 'Fender';
        if (id === 2) return 'Gibson';
        if (id === 3) return 'Reverend';
    }

    return (
        <>
            <Hero img={preview ? preview : defaultImg} name={data?.name ? data.name : 'There will be a name'} brand={data?.brand ? displayBrandName(data.brand) : 'Brand name'} />
            <div className="product-wrap">
                <Form onSubmit={handlePublish}>
                    <header className="editor">
                        <h1>Add guitar</h1>
                        <Button className="accent-button" type="submit">Publish</Button>
                    </header>
                    <div className="product-content-container">
                        <div>
                            <ProductCard guitarData={{ main_img: (preview ? preview : defaultImg), name: data?.name, brand: { name: displayBrandName(data.brand) } }} />
                            <FileTrigger onSelect={handleFileSelect} acceptedFileTypes={['image/png']} ref={fileRef}>
                                <Button className="primary-button" style={{ width: "100%", margin: "24px 0" }} >{!preview ? 'Upload photo' : 'Change photo'}</Button>
                            </FileTrigger>
                            {error && <span className="error">{error}</span>}
                            {preview && <Button
                                className="cancel-button"
                                onPress={() => { fileRef.current = null; setPreview(null) }}
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