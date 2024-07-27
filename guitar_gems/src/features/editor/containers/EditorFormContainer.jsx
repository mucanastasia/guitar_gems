import { EditorForm } from '../components/editor-form/EditorForm';
import { useEditorData } from '../../../components/editor/contexts/EditorDataContext';

export function EditorFormContainer() {
	const { data, setData } = useEditorData();

	const handleChangeName = (e) => {
		setData({ ...data, name: e.target.value });
	};

	const handleChangeDescription = (value) => {
		setData({ ...data, description: value });
	};

	const props = {
		handleChangeName,
		handleChangeDescription,
		name: data.name,
		description: data.description,
	};

	return <EditorForm {...props} />;
}
