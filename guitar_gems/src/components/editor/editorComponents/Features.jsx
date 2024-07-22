import { useEditorData } from '../contexts/EditorDataContext';
import { Button, Input, TextField } from 'react-aria-components';
import { HeadingMedium } from '@ui/heading';

export default function Features() {
	const { data, setData } = useEditorData();
	let featureRenderCounter = 0;

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
		if (!data.features) return null;
		return data.features.map((feature, index) => (
			<li key={'features_' + featureRenderCounter++}>
				<TextField aria-label="Product feature" type="text">
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
		<article className="edit-features">
			<HeadingMedium text="Features" />
			<ul>{renderFeatures()}</ul>
			<Button onPress={handleFeatureAdd}>+ Add a feature</Button>
		</article>
	);
}
