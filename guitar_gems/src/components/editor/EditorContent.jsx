/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { TextArea, TextField } from 'react-aria-components';
import { Button, Input, FieldError } from 'react-aria-components';
import SpecsDropdown from './SpecsDropdown';
import Spinner from '../spinner/Spinner';
import MyDatePicker from './MyDatePicker';
import './styles/editorContent.css';

export default function EditorContent({ data, setData }) {
	const [loading, setLoading] = useState(true);
	const [selectOptions, setSelectOptions] = useState({
		brands: [],
		guitar_types: [],
		materials: [],
		countries: [],
	});
	let featureRenderCounter = 0;

	useEffect(() => {
		const fetchData = async (tableName) => {
			try {
				const { data, error } = await supabase.from(tableName).select(`
                                id,
                                name
                            `);
				if (error) throw error;
				return data;
			} catch (error) {
				console.log(error.message);
				throw error;
			}
		};

		const loadSelectOptions = async () => {
			try {
				setLoading(true);
				const [brands, guitar_types, materials, countries] = await Promise.all([
					fetchData('brands'),
					fetchData('guitar_types'),
					fetchData('materials'),
					fetchData('countries'),
				]);

				setSelectOptions({
					brands: brands,
					guitar_types: guitar_types,
					materials: materials,
					countries: countries,
				});
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadSelectOptions();
	}, []);

	const handleFeatureAdd = () => {
		const newFeature = '';
		setData({ ...data, features: [...data.features, newFeature] });
	};

	const handleFeatureDelete = (index) => {
		const newFeatures = data.features.filter((_, i) => i !== index);
		setData({ ...data, features: newFeatures });
	};

	const handleFeatureChange = (index, value) => {
		const newFeatures = data.features.map((feature, i) =>
			i === index ? value : feature
		);
		setData({ ...data, features: newFeatures });
	};

	const renderFeatures = () => {
		return data.features.map((feature, index) => (
			<li key={'features_' + featureRenderCounter++}>
				<TextField
					aria-label="Product feature"
					type="text">
					<Input
						placeholder="Fill in a feature"
						value={feature}
						onChange={(e) => handleFeatureChange(index, e.target.value)}
					/>
				</TextField>
				<Button
					className="material-symbols-outlined"
					onPress={() => handleFeatureDelete(index)}>
					delete
				</Button>
			</li>
		));
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<section className="product-content edit-content">
					<article>
						<h2>Name</h2>
						<TextField
							aria-label="Product name"
							isRequired
							type="text">
							<Input
								value={data.name}
								onChange={(e) => {
									setData({ ...data, name: e.target.value });
								}}
								placeholder="Fill in a name"
							/>
							<FieldError />
						</TextField>
					</article>
					<article>
						<h2>Description</h2>
						<TextField
							aria-label="Product description"
							isRequired
							type="text"
							value={data.description}
							onChange={(value) => {
								setData({ ...data, description: value });
							}}>
							<TextArea placeholder="Fill in a description" />
							<FieldError />
						</TextField>
					</article>
					<article>
						<h2>Specs</h2>
						<SpecsDropdown
							label="Brand"
							objectKey="brand_id"
							values={selectOptions.brands}
							selected={data}
							setSelected={setData}
						/>
						<SpecsDropdown
							label="Type"
							objectKey="type_id"
							values={selectOptions.guitar_types}
							selected={data}
							setSelected={setData}
						/>
						<SpecsDropdown
							label="Body"
							objectKey="body_material_id"
							values={selectOptions.materials}
							selected={data}
							setSelected={setData}
						/>
						<SpecsDropdown
							label="Neck"
							objectKey="neck_material_id"
							values={selectOptions.materials}
							selected={data}
							setSelected={setData}
						/>
						<SpecsDropdown
							label="Fingerboard"
							objectKey="fingerboard_material_id"
							values={selectOptions.materials}
							selected={data}
							setSelected={setData}
						/>
						<MyDatePicker
							label="Release Date"
							objectKey="release_date"
							data={data}
							setData={setData}
						/>
						<SpecsDropdown
							label="Country"
							objectKey="country_id"
							values={selectOptions.countries}
							selected={data}
							setSelected={setData}
						/>
					</article>
					<article className="edit-features">
						<h2>Features</h2>
						<ul>{renderFeatures()}</ul>
						<Button onPress={handleFeatureAdd}>+ Add a feature</Button>
					</article>
				</section>
			)}
		</>
	);
}
