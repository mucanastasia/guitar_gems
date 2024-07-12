/* eslint-disable react/prop-types */
import { Button, ComboBox, Input, Label, ListBox, ListBoxItem, Popover, FieldError } from 'react-aria-components';
import './styles/editorContent.css';

export default function SpecsDropdown({ label, values, selected, setSelected }) {
    const handleSelect = (id) => {
        if (label === 'Brand') setSelected({ ...selected, brand: id });
        if (label === 'Type') setSelected({ ...selected, type: id });
        if (label === 'Body') setSelected({ ...selected, body: id });
        if (label === 'Neck') setSelected({ ...selected, neck: id });
        if (label === 'Fingerboard') setSelected({ ...selected, fingerboard: id });
        if (label === 'Country') setSelected({ ...selected, country: id });
    }

    return (
        <ComboBox isRequired defaultItems={values} onSelectionChange={handleSelect}>
            <div>
                <Label>{label}</Label>
                <div>
                    <Input placeholder={`Select ${label} or start to type`} />
                    <Button><span className="material-symbols-outlined">
                        keyboard_arrow_down
                    </span></Button>
                </div>
            </div>
            <FieldError />
            <Popover>
                <ListBox>
                    {item => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
                </ListBox>
            </Popover>
        </ComboBox>
    );
}