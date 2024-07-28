import { useEffect, useState } from 'react';
import { supabase } from '@api/supabaseClient';
import { useParams, useHistory } from 'react-router-dom';
import EditorDataProvider from './contexts/EditorDataContext';
import './styles/editor.css';
import { NotFoundPage } from '@features/not-found';
import { Spinner } from '@ui/spinner';

export default function EditGuitar({ children }) {
	const [data, setData] = useState({});

	const [uploadingPhoto, setUploadingPhoto] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const { id } = useParams();
	const history = useHistory();
	const [errorData, setErrorData] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data, error } = await supabase
					.from('guitars')
					.select(
						`
                            id,
                            name,
                            description,
                            release_date,
                            main_img,
                            brand_id,
                            country_id,
                            type_id,
                            body_material_id,
                            neck_material_id,
                            fingerboard_material_id,
                            features
                        `
					)
					.eq('id', id)
					.single();

				if (error) throw error;

				setData(data);
			} catch (error) {
				console.error(error.message);
				setErrorData(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const handleSave = async (e) => {
		try {
			e.preventDefault();
			if (!data.main_img) {
				throw new Error('A photo is required');
			}
			setLoading(true);
			const filteredData = {
				...data,
				features: data.features.filter((feature) => feature.trim() !== ''),
			};
			const { error } = await supabase.from('guitars').update(filteredData).eq('id', id);
			if (error) {
				throw error;
			} else {
				history.push(`/guitars/${id}`);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	//don't need this anymore
	const displaySaveButton = () => {
		if (loading) {
			return 'Saving...';
		} else {
			return 'Save';
		}
	};

	const handleCancelClick = () => {
		history.push(`/guitars/${id}`);
	};

	if (errorData) {
		return <NotFoundPage />;
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		<EditorDataProvider
			data={data}
			setData={setData}
			loading={loading}
			setLoading={setLoading}
			error={error}
			setError={setError}
			displayButtonLabel={displaySaveButton}
			handleSubmit={handleSave}
			uploadingPhoto={uploadingPhoto}
			setUploadingPhoto={setUploadingPhoto}
			title="Edit Guitar"
			handleCancelClick={handleCancelClick}
			id={id}>
			{children}
		</EditorDataProvider>
	);
}

/*
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@api/supabaseClient';
import { useParams, useHistory } from 'react-router-dom';
import EditorDataProvider from './contexts/EditorDataContext';
import './styles/editor.css';
import { NotFoundPage } from '@features/not-found';
import { Spinner } from '@ui/spinner';

export default function EditGuitar({ children }) {
	const [name, setName] = useState('');
	const [brand, setBrand] = useState('');

	const dataRef = useRef({});
	const [uploadingPhoto, setUploadingPhoto] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const { id } = useParams();
	const history = useHistory();
	const [errorData, setErrorData] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data, error } = await supabase
					.from('guitars')
					.select(
						`
							id,
							name,
							description,
							release_date,
							main_img,
							brand_id,
							country_id,
							type_id,
							body_material_id,
							neck_material_id,
							fingerboard_material_id,
							features
						`
					)
					.eq('id', id)
					.single();

				if (error) throw error;

				dataRef.current = data;
				setName(data.name);
				setBrand(data.brand_id);
			} catch (error) {
				console.error(error.message);
				setErrorData(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const handleSave = async (e) => {
		try {
			e.preventDefault();
			if (!dataRef.current.main_img) {
				throw new Error('A photo is required');
			}
			setLoading(true);
			const filteredData = {
				...dataRef.current,
				features: dataRef.current.features.filter((feature) => feature.trim() !== ''),
			};
			const { error } = await supabase.from('guitars').update(filteredData).eq('id', id);
			if (error) {
				throw error;
			} else {
				history.push(`/guitars/${id}`);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const displaySaveButton = () => {
		if (loading) {
			return 'Saving...';
		} else {
			return 'Save';
		}
	};

	const handleCancelClick = () => {
		history.push(`/guitars/${id}`);
	};

	if (errorData) {
		return <NotFoundPage />;
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		<EditorDataProvider
			data={dataRef.current}
			setData={dataRef.current}
			loading={loading}
			setLoading={setLoading}
			uploadingPhoto={uploadingPhoto}
			setUploadingPhoto={setUploadingPhoto}
			error={error}
			setError={setError}
			displayButtonLabel={displaySaveButton}
			handleSubmit={handleSave}
			title="Edit Guitar"
			handleCancelClick={handleCancelClick}
			id={id}>
			{children}
		</EditorDataProvider>
	);
}

*/
