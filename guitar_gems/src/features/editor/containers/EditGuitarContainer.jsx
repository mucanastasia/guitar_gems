import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditorDataProvider } from '../contexts/EditorDataContext';
import { NotFoundPage } from '@features/error';
import { EditorContainer } from './EditorContainer';
import { useTitle } from '@helpers/useTitle';
import { EDIT_GUITAR_TITLE } from '../constants/editor';
import { useEditGuitar } from '@api/useEditGuitar';
import { useEditableGuitar } from '@api/useEditableGuitar';
import { Spinner } from '@ui/spinner';

export function EditGuitarContainer() {
	const [error, setError] = useState(false);

	const { id } = useParams();

	const { data: guitar, isPending: loading, isError } = useEditableGuitar(id);

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

	useEffect(() => {
		if (guitar) {
			setData(guitar);
		}
	}, [guitar]);

	useTitle(guitar && `${EDIT_GUITAR_TITLE} - ${guitar.name}`);

	const { mutate, isPending } = useEditGuitar(id);

	const handleSave = async (e) => {
		e.preventDefault();
		if (!data.main_img) {
			setError('A photo is required');
			return;
		}

		const filteredData = {
			...data,
			features: data.features.filter((feature) => feature.trim() !== ''),
		};

		await mutate(
			{ filteredData, id },
			{
				onError: (mutationError) => {
					setError(mutationError.message);
				},
			}
		);
	};

	const props = {
		data,
		setData,
		loading,
		submitting: isPending,
		error,
		setError,
	};

	if (isError) {
		return <NotFoundPage />;
	}

	if (loading || isPending) {
		return <Spinner />;
	}

	return (
		<EditorDataProvider {...props}>
			<EditorContainer handleSubmit={handleSave} />
		</EditorDataProvider>
	);
}
