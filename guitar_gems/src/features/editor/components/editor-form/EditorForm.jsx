import { SpecsSection } from '../specs-section';
import { HeadingMedium } from '@ui/heading';
import { EditorField } from '@ui/editor-field';
import { TextArea } from '@ui/text-area';
import { GuitarFeaturesContainer } from '../../containers/GuitarFeaturesContainer';
import {
	HEADING_NAME,
	HEADING_DESCRIPTION,
	HEADING_SPECS,
} from '@features/product/constants/productHeadingNames';
import './EditorForm.css';

export function EditorForm({ ...props }) {
	const { name, description, handleChangeName, handleChangeDescription } = props;

	return (
		<section className="product-content edit-content">
			<article>
				<HeadingMedium text={HEADING_NAME} />
				<EditorField
					name="Product name"
					value={name}
					onChange={handleChangeName}
					placeholder="Fill in a name"
				/>
			</article>

			<article>
				<HeadingMedium text={HEADING_DESCRIPTION} />
				<TextArea
					name="Product description"
					value={description}
					onChange={handleChangeDescription}
					placeholder="Press Enter for new paragraphs"
				/>
			</article>

			<article>
				<HeadingMedium text={HEADING_SPECS} />
				<SpecsSection />
			</article>
			<GuitarFeaturesContainer />
		</section>
	);
}
