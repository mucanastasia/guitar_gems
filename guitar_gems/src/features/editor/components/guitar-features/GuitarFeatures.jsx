import { Button } from '@ui/button';
import { HeadingMedium } from '@ui/heading';
import { IconButton } from '@ui/icon';
import { EditorField } from '@ui/editor-field';
import { HEADING_FEATURES } from '@features/product/constants/productHeadingNames';
import './GuitarFeatures.css';

export function GuitarFeatures({ ...props }) {
	let {
		features,
		featureRenderCounter,
		handleFeatureAdd,
		handleFeatureDelete,
		handleFeatureChange,
	} = props;

	const renderFeatures = () => {
		if (!features) return null;
		return features.map((feature, index) => (
			<li key={'features_' + featureRenderCounter++}>
				<EditorField
					name="Product feature"
					value={feature}
					onChange={(e) => handleFeatureChange(index, e.target.value)}
					placeholder="Fill in a feature"
					required={false}
				/>
				<IconButton
					name="delete"
					size="medium"
					onClick={() => handleFeatureDelete(index)}
				/>
			</li>
		));
	};

	return (
		<article className="edit-features">
			<HeadingMedium text={HEADING_FEATURES} />
			<ul>{renderFeatures()}</ul>
			<Button
				state="secondary"
				width="89%"
				margin="0 0 0 28px"
				onClick={handleFeatureAdd}>
				+ Add a feature
			</Button>
		</article>
	);
}
