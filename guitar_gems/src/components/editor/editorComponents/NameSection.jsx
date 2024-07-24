import { EditorField } from '@ui/editor-field';
import { useEditorData } from '../contexts/EditorDataContext';
import { HeadingMedium } from '@ui/heading';

export default function NameSection() {
	const { data, setData } = useEditorData();

	const handleChangeName = (e) => {
		setData({ ...data, name: e.target.value });
	};

	return (
		<article>
			<HeadingMedium text="Name" />
			<EditorField
				name="Product name"
				value={data.name}
				onChange={handleChangeName}
				placeholder="Fill in a name"
			/>
		</article>
	);
}
