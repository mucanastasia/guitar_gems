import { GuitarFeatures } from '../components/guitar-features';
import { useEditorData } from '../../../components/editor/contexts/EditorDataContext';

export function GuitarFeaturesContainer() {
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

	let props = {
		features: data.features,
		featureRenderCounter,
		handleFeatureAdd,
		handleFeatureDelete,
		handleFeatureChange,
	};

	return <GuitarFeatures {...props} />;
}
