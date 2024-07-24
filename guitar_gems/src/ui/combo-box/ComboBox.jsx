/* eslint-disable react/prop-types */
import {
	Button as AriaButton,
	ComboBox as AriaComboBox,
	Input,
	ListBox,
	ListBoxItem,
	Popover as AriaPopover,
	FieldError,
} from 'react-aria-components';
import { Icon } from '@ui/icon';
import { Label } from '@ui/label';
import './ComboBox.css';

export function ComboBox({ label, selected, value, options, onSelectionChange }) {
	return (
		<AriaComboBox
			isRequired
			defaultItems={options}
			selectedKey={selected}
			inputValue={value}
			onSelectionChange={onSelectionChange}>
			<div>
				<Label>{label}</Label>
				<div>
					<Input placeholder={`Select ${label} or start to type`} />
					<AriaButton>
						<Icon name="keyboard_arrow_down" size="medium" />
					</AriaButton>
				</div>
			</div>
			<FieldError />
			<AriaPopover>
				<ListBox>{(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}</ListBox>
			</AriaPopover>
		</AriaComboBox>
	);
}
