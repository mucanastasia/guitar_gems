import { TextField, FieldError, TextArea } from 'react-aria-components';
import { useEditorData } from '../contexts/EditorDataContext';

export default function DescriptionSection() {
	const { data, setData } = useEditorData();

	const handleChangeDescription = (value) => {
		setData({ ...data, description: value });
	};

	return (
		<article>
			<h2>Description</h2>
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
