import { useEffect, useState } from 'react';
import { supabase } from '@api/supabaseClient';
import { useParams, useHistory } from 'react-router-dom';
import { EditorDataProvider } from '../contexts/EditorDataContext';
import { NotFoundPage } from '@features/not-found';
import { EditorContainer } from './EditorContainer';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { useTitle } from '@helpers/useTitle';
import { EDIT_GUITAR_TITLE } from '../constants/editor';

export function EditGuitarContainer() {
	const [data, setData] = useState({});

	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(false);

	const { id } = useParams();
	const history = useHistory();
	const [notFound, setNotFound] = useState(false);

	useTitle(`${EDIT_GUITAR_TITLE} - ${data?.name}`);

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
				setNotFound(true);
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
			setSubmitting(true);

			const filteredData = {
				...data,
				features: data.features.filter((feature) => feature.trim() !== ''),
			};
			const { error } = await supabase.from('guitars').update(filteredData).eq('id', id);
			if (error) {
				throw error;
			} else {
				history.push(`${GUITAR_PATH_DIR}${id}`);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	const props = {
		data,
		setData,
		loading,
		submitting,
		error,
		setError,
	};

	if (notFound) {
		return <NotFoundPage />;
	}

	return (
		<EditorDataProvider {...props}>
			<EditorContainer handleSubmit={handleSave} />
		</EditorDataProvider>
	);
}
