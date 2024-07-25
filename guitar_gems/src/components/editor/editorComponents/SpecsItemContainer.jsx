import { ComboBox } from '@ui/combo-box';
import { useEditorData } from '../contexts/EditorDataContext';
import { useSelectOptions } from '../contexts/SelectOptionsContext';

export default function SpecsItemContainer({ label, objectKey, options }) {
	const { data, setData } = useEditorData();
	const { selectOptions } = useSelectOptions();

	const handleSelectionChange = (id) => {
		setData({
			[objectKey]: selectOptions[options].find((o) => o.id === id)?.name ?? '',
		});
		setData({ ...data, [objectKey]: id });
	};

	return (
		<ComboBox
			label={label}
			objectKey={objectKey}
			options={selectOptions[options]}
			selected={data[objectKey]}
			value={selectOptions[options].name}
			onSelectionChange={handleSelectionChange}
		/>
	);
}
