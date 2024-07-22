import { useEffect, useState } from 'react';
import { supabase } from '@api/supabaseClient';
import { useParams, useHistory } from 'react-router-dom';
import EditorDataProvider from './contexts/EditorDataContext';
import './styles/editor.css';
import NotFoundPage from '../product/NotFoundPage';
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
		e.preventDefault();
		if (!data.main_img) {
			setError('A photo is required');
			return;
		}
		setLoading(true);
		const filteredData = {
			...data,
			features: data.features.filter((feature) => feature.trim() !== ''),
		};
		const { error } = await supabase.from('guitars').update(filteredData).eq('id', id);
		if (error) {
			console.error('Error updating data:', error);
		} else {
			history.push(`/guitars/${id}`);
		}
		setLoading(false);
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
			data={data}
			setData={setData}
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
