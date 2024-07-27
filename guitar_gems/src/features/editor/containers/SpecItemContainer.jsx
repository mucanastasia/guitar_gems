import { ComboBox } from '@ui/combo-box';
import { useEditorData } from '../../../components/editor/contexts/EditorDataContext'; //TODO: UPDATE
import { useSelectOptions } from '../contexts/SelectOptionsContext'; //TODO: UPDATE

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
			value={selectOptions[optionsKey].name}
			onSelectionChange={handleSelectionChange}
		/>
	);
}
