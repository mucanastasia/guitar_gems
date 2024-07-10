/* eslint-disable react/prop-types */
import { TextArea, TextField } from 'react-aria-components';
import { Button, Input, Label, Popover, FieldError } from 'react-aria-components';
import { Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Form } from 'react-aria-components';
import SpecsDropdown from './SpecsDropdown';
import './styles/editorContent.css';
import './styles/datePicker.css';

export default function EditorContent({ data, setData }) {

    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     const day = date.getDate();
    //     const options = { month: 'long', year: 'numeric' };
    //     const formattedDate = date.toLocaleDateString('en-GB', options);
    //     return `${day} ${formattedDate}`;
    // };

    // const renderSpecs = () => {
    // const formattedDate = formatDate(guitarData.release_date);

    // const data = [
    //     ['Brand', guitarData.brand.name],
    //     ['Type', guitarData.type.name],
    //     ['Body', guitarData.body_material.name],
    //     ['Neck', guitarData.neck_material.name],
    //     ['Fingerboard', guitarData.fingerboard_material.name],
    //     ['Release date', formattedDate],
    //     ['Country', guitarData.country.name],
    // ];

    //     return data.map((row) => (
    //         <tr key={row[0]}>
    //             <th><p>{row[0]}</p></th>
    //             <td><p>{row[1]}</p></td>
    //         </tr>
    //     ));
    // };

    // const renderFeatures = () => {
    //     return guitarData.features.map((feature) => (
    //         <li key={feature.id}><p>{feature.description}</p></li>
    //     ));
    // };

    const brandVals = [
        { id: 1, name: "Fender" },
        { id: 2, name: "Gibson" }
    ];

    return (
        <section className="product-content edit-content">
            <article>
                <h2>Name</h2>
                <TextField aria-label="Product name" isRequired >
                    <Input value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                    <FieldError />
                </TextField>
            </article>
            <article>
                <h2>Description</h2>
                <TextField aria-label="Product description" isRequired>
                    <TextArea />
                    <FieldError />
                </TextField>
            </article>
            <article>
                <h2>Specs</h2>
                <SpecsDropdown label="Brand" values={brandVals} />
                <SpecsDropdown label="Type" values={brandVals} />
                <SpecsDropdown label="Body" values={brandVals} />
                <SpecsDropdown label="Neck" values={brandVals} />
                <SpecsDropdown label="Fingerboard" values={brandVals} />


                <DatePicker name="date" isRequired>
                    <div>
                        <Label>Release Date</Label>
                        <Group>
                            <DateInput>
                                {(segment) => <DateSegment segment={segment} />}
                            </DateInput>
                            <Button className="react-aria-Button material-symbols-outlined">calendar_month</Button>
                        </Group>
                    </div>
                    <FieldError />
                    <Popover>
                        <Dialog>
                            <Calendar>
                                <header>
                                    <Button slot="previous"><span className="material-symbols-outlined">
                                        chevron_left
                                    </span></Button>
                                    <Heading />
                                    <Button slot="next"><span className="material-symbols-outlined">
                                        chevron_right
                                    </span></Button>
                                </header>
                                <CalendarGrid>
                                    {(date) => <CalendarCell date={date} />}
                                </CalendarGrid>
                            </Calendar>
                        </Dialog>
                    </Popover>
                </DatePicker>


                <SpecsDropdown label="Country" values={brandVals} />
            </article>
            <article>
                <h2>Features</h2>
                <ul>
                    <li>
                        <TextField aria-label="Product feature">
                            <Input />
                        </TextField>
                    </li>
                </ul>
            </article>
        </section>
    );
}