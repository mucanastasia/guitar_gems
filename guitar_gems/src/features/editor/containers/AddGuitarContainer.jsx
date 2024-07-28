import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '@api/supabaseClient';
import { EditorDataProvider } from '../contexts/EditorDataContext';
import { EditorContainer } from './EditorContainer';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';

export default function AddGuitarContainer() {
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

	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(false);

	const guitarIdRef = useRef(null);
	const history = useHistory();

	const handlePublish = async (e) => {
		try {
			e.preventDefault();
			if (!data.main_img) {
				throw new Error('A photo is required');
			}
			setSubmitting(true);
			const filteredData = {
				...data,
				features: data.features.filter((feature) => feature.trim() !== ''),
			};
			const { data: responseData, error } = await supabase
				.from('guitars')
				.insert([filteredData])
				.select('id');
			if (error) {
				throw error;
			} else {
				guitarIdRef.current = responseData[0].id;
				history.push(`${GUITAR_PATH_DIR}${guitarIdRef.current}`);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<EditorDataProvider
			data={data}
			setData={setData}
			submitting={submitting}
			error={error}
			setError={setError}>
			<EditorContainer handleSubmit={handlePublish} />
		</EditorDataProvider>
	);
}
