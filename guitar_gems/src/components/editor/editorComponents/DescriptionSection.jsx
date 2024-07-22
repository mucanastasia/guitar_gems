import { TextField, FieldError, TextArea } from 'react-aria-components';
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
			<TextField
				aria-label="Product description"
				isRequired
				value={data.description}
				onChange={handleChangeDescription}>
				<TextArea placeholder="Fill in a description. Press Enter for new paragraphs." />
				<FieldError />
			</TextField>
		</article>
	);
}
