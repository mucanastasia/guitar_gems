/* eslint-disable react/prop-types */
import {
	Button,
	ComboBox,
	Input,
	ListBox,
	ListBoxItem,
	Popover as AriaPopover,
	FieldError,
} from 'react-aria-components';
import { useEditorData } from '../contexts/EditorDataContext';
import { useSelectOptions } from '../contexts/SelectOptionsContext';
import '../styles/editorContent.css';
import { Icon } from '@ui/icon';
import { Label } from '@ui/label';

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
						<Icon name="keyboard_arrow_down" size="medium" />
					</Button>
				</div>
			</div>
			<FieldError />
			<AriaPopover>
				<ListBox>{(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}</ListBox>
			</AriaPopover>
		</ComboBox>
	);
}
