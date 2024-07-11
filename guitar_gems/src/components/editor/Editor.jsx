import { useState, useEffect } from 'react';
import EditorContent from './EditorContent';
import ProductCard from '../catalogue/ProductCard';
import { Form, Button, FileTrigger } from 'react-aria-components';
import defaultImg from '../../assets/img-placeholder.png';
import Hero from '../product/Hero';
import './styles/editor.css';

export default function Editor() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState({
        name: '',
        brand: '',
    });

    useEffect(() => {
        // Clean up the object URL when the component unmounts or when a new file is selected
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleFileSelect = (files) => {
        const selectedFile = files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setData({
            name: '',
            brand: '',
        });
        setPreview(null);
    };

    return (
        <>
            <Hero img={preview ? preview : defaultImg} name={data?.name ? data.name : 'There will be a name'} brand={data?.brand ? data.brand : 'Brand name'} />
            <div className="product-wrap">
                <Form onSubmit={(e) => { e.preventDefault() }}>
                    <header className="editor">
                        <h1>Add guitar</h1>
                        <Button className="cancelBtn" onPress={handleCancel}>Cancel</Button>
                        <Button className="publishBtn" type="submit">Publish</Button>
                    </header>
                    <div className="product-content-container">
                        <div>
                            <ProductCard guitarData={{ main_img: (preview ? preview : defaultImg), name: data?.name, brand: data?.brand }} />
                            <FileTrigger onSelect={(files) => { handleFileSelect(files); console.log(file); }} >
                                <Button>Select a file</Button>
                            </FileTrigger>
                        </div>
                        <EditorContent data={data} setData={setData} />
                    </div>
                </Form>
            </div>
        </>
    );
}