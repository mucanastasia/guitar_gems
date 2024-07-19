import { useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useParams, useHistory } from 'react-router-dom';
import { useEditorData } from './contexts/EditorDataContext';
import Editor from './Editor';
import './styles/editor.css';

export default function EditGuitar() {
	const { id } = useParams();
	const history = useHistory();
	const { data, setData, loading, setLoading, setError } = useEditorData();

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
		const { error } = await supabase.from('guitars').update(data).eq('id', id);
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

	return (
		<Editor
			handleSubmit={handleSave}
			title="Edit Guitar"
			displayButtonLabel={displaySaveButton}
			handleCancelClick={handleCancelClick}
			id={id}
		/>
	);
}
