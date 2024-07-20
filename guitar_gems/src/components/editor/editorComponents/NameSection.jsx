import { Input, FieldError, TextField } from 'react-aria-components';
import { useEditorData } from '../contexts/EditorDataContext';

export default function NameSection() {
	const { data, setData } = useEditorData();

	const handleChangeName = (e) => {
		setData({ ...data, name: e.target.value });
	};

	return (
		<article>
			<h2>Name</h2>
			<TextField aria-label="Product name" isRequired type="text">
				<Input
					value={data.name}
					onChange={handleChangeName}
					placeholder="Fill in a name"
				/>
				<FieldError />
			</TextField>
		</article>
	);
}
