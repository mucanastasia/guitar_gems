import { ComboBox } from '@ui/combo-box';
import { useEditorData } from '../contexts/EditorDataContext';
import { useSelectOptions } from '../contexts/SelectOptionsContext';

export function SpecItemContainer({ label, guitarKey, optionsKey }) {
	const { data, setData } = useEditorData();
	const { selectOptions } = useSelectOptions();

	const handleSelectionChange = (id) => {
		setData({ ...data, [guitarKey]: id });
	};

	return (
		<ComboBox
			label={label}
			objectKey={guitarKey}
			options={selectOptions[optionsKey]}
			selected={data[guitarKey]}
			onSelectionChange={handleSelectionChange}
		/>
	);
}
