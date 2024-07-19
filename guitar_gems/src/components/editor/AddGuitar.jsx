import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useEditorData } from './contexts/EditorDataContext';
import Editor from './Editor';

export default function AddGuitar() {
	const guitarIdRef = useRef(null);
	const history = useHistory();
	const { data, loading, setLoading, setError } = useEditorData();

	const handlePublish = async (e) => {
		setLoading(true);
		e.preventDefault();
		if (!data.main_img) {
			setError('A photo is required');
			setLoading(false);
			return;
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
		<Editor
			handleSubmit={handlePublish}
			title="Add Guitar"
			displayButtonLabel={displayPublishButton}
		/>
	);
}
