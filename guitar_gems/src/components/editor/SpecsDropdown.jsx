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
import './styles/editorContent.css';

export default function SpecsDropdown({
	label,
	objectKey,
	values,
	selected,
	setSelected,
}) {
	const handleSelectionChange = (id) => {
		setSelected({
			[objectKey]: values.find((o) => o.id === id)?.name ?? '',
		});
		setSelected({ ...selected, [objectKey]: id });
	};

	return (
		<ComboBox
			isRequired
			defaultItems={values}
			selectedKey={selected[objectKey]}
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
