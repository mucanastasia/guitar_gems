/* eslint-disable react/prop-types */
import { Button, ComboBox, Input, Label, ListBox, ListBoxItem, Popover, FieldError } from 'react-aria-components';
import './styles/editorContent.css';

export default function SpecsDropdown({ label, values }) {

    return (
        <ComboBox isRequired>
            <div>
                <Label>{label}</Label>
                <div>
                    <Input />
                    <Button><span className="material-symbols-outlined">
                        keyboard_arrow_down
                    </span></Button>
                </div>
            </div>
            <FieldError />
            <Popover>
                <ListBox>
                    {values.map((value) => (
                        <ListBoxItem key={value.id}>{value.name}</ListBoxItem>
                    ))}
                </ListBox>
            </Popover>
        </ComboBox>
    );
}