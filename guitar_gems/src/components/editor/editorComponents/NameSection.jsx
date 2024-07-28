import { EditorField } from '@ui/editor-field';
import { useEditorData } from '../../../features/editor/contexts/EditorDataContext';
import { HeadingMedium } from '@ui/heading';
import { HEADING_NAME } from '@features/product/constants/productHeadingNames';

export default function NameSection() {
	const { data, setData } = useEditorData();

	const handleChangeName = (e) => {
		setData({ ...data, name: e.target.value });
	};

	return (
		<article>
			<HeadingMedium text={HEADING_NAME} />
			<EditorField
				name="Product name"
				value={data.name}
				onChange={handleChangeName}
				placeholder="Fill in a name"
			/>
		</article>
	);
}
