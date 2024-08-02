import { useState, useEffect } from 'react';
import { EditorDataProvider } from '../contexts/EditorDataContext';
import { EditorContainer } from './EditorContainer';
import { useTitle } from '@helpers/useTitle';
import { ADD_GUITAR_TITLE } from '../constants/editor';
import { Spinner } from '@ui/spinner';
import { useAddGuitar } from '@api/useAddGuitar';

export function AddGuitarContainer() {
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

	const { mutate, isPending } = useAddGuitar();

	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useTitle(ADD_GUITAR_TITLE);

	const handlePublish = async (e) => {
		e.preventDefault();
		if (!data.main_img) {
			setError('A photo is required');
			return;
		}
		const filteredData = {
			...data,
			features: data.features.filter((feature) => feature.trim() !== ''),
		};

		console.log('Filtered Data:', filteredData);

		await mutate(
			{ filteredData },
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
		submitting: isPending,
		error,
		setError,
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 200);

		return () => clearTimeout(timer);
	}, []);

	if (loading || isPending) {
		return <Spinner />;
	}

	return (
		<EditorDataProvider {...props}>
			<EditorContainer handleSubmit={handlePublish} />
		</EditorDataProvider>
	);
}
