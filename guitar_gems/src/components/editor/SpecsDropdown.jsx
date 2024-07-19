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
import { useEditorData } from './contexts/EditorDataContext';
import './styles/editorContent.css';

export default function SpecsDropdown({ label, objectKey, values }) {
	const { data, setData } = useEditorData();

	const handleSelectionChange = (id) => {
		setData({
			[objectKey]: values.find((o) => o.id === id)?.name ?? '',
		});
		setData({ ...data, [objectKey]: id });
	};

	return (
		<ComboBox
			isRequired
			defaultItems={values}
			selectedKey={data[objectKey]}
			inputValue={values.name}
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
