import { TextArea } from '@ui/text-area';
import { useEditorData } from '../contexts/EditorDataContext';
import { HeadingMedium } from '@ui/heading';

export default function DescriptionSection() {
	const { data, setData } = useEditorData();

	const handleChangeDescription = (value) => {
		setData({ ...data, description: value });
	};

	return (
		<article>
			<HeadingMedium text="Description" />
			<TextArea
				name="Product description"
				value={data.description}
				onChange={handleChangeDescription}
				placeholder="Press Enter for new paragraphs"
			/>
		</article>
	);
}
