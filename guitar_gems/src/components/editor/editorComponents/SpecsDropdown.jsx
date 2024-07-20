/* eslint-disable react/prop-types */
import {
	Button,
	ComboBox,
	Input,
	Label,
	ListBox,
	ListBoxItem,
	Popover,
	FieldError,
} from 'react-aria-components';
import { useEditorData } from '../contexts/EditorDataContext';
import { useSelectOptions } from '../contexts/SelectOptionsContext';
import '../styles/editorContent.css';

export default function SpecsDropdown({ label, objectKey, options }) {
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
			isRequired
			defaultItems={selectOptions[options]}
			selectedKey={data[objectKey]}
			inputValue={selectOptions[options].name}
			onSelectionChange={handleSelectionChange}>
			<div>
				<Label>{label}</Label>
				<div>
					<Input placeholder={`Select ${label} or start to type`} />
					<Button>
						<span className="material-symbols-outlined">
							keyboard_arrow_down
						</span>
					</Button>
				</div>
			</div>
			<FieldError />
			<Popover>
				<ListBox>
					{(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
				</ListBox>
			</Popover>
		</ComboBox>
	);
}
