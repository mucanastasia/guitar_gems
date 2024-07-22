import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import EditorDataProvider from './contexts/EditorDataContext';
import Spinner from '../spinner/Spinner';

export default function AddGuitar({ children }) {
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
		features: [],
	});

	const [uploadingPhoto, setUploadingPhoto] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const guitarIdRef = useRef(null);
	const history = useHistory();

	const handlePublish = async (e) => {
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
		const { data: responseData, error } = await supabase
			.from('guitars')
			.insert([filteredData])
			.select('id');
		if (error) {
			console.error('Error inserting data:', error);
		} else {
			guitarIdRef.current = responseData[0].id;

			history.push(`/guitars/${guitarIdRef.current}`);
		}
		setLoading(false);
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
			displayButtonLabel={displayPublishButton}
			handleSubmit={handlePublish}
			title="Add Guitar">
			{children}
		</EditorDataProvider>
	);
}
