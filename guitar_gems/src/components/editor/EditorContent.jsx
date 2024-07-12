/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { TextArea, TextField } from 'react-aria-components';
import { Button, Input, Label, Popover, FieldError } from 'react-aria-components';
import { Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading } from 'react-aria-components';
import SpecsDropdown from './SpecsDropdown';
import './styles/editorContent.css';
import './styles/datePicker.css';
import Spinner from '../spinner/Spinner';

import { I18nProvider } from 'react-aria';

export default function EditorContent({ data, setData }) {
    const [loading, setLoading] = useState(true);
    const [selectOptions, setSelectOptions] = useState({
        brands: [],
        guitar_types: [],
        materials: [],
        countries: [],
    });

    useEffect(() => {
        const fetchData = async (tableName) => {
            try {
                const { data, error } = await supabase
                    .from(tableName)
                    .select(`
                                id,
                                name
                            `);
                if (error) throw error;
                return data;
            } catch (error) {
                console.log(error.message);
                throw error;
            }
        };

        const loadSelectOptions = async () => {
            try {
                setLoading(true);
                const [brands, guitar_types, materials, countries] = await Promise.all([
                    fetchData('brands'),
                    fetchData('guitar_types'),
                    fetchData('materials'),
                    fetchData('countries')
                ]);

                setSelectOptions({
                    brands: brands,
                    guitar_types: guitar_types,
                    materials: materials,
                    countries: countries
                });
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadSelectOptions();
    }, []);


    // console.log(selectOptions);

    return (
        <>
            {loading ? <Spinner /> :
                <section className="product-content edit-content">
                    <article>
                        <h2>Name</h2>
                        <TextField aria-label="Product name" isRequired >
                            <Input value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} placeholder="Fill in a name" />
                            <FieldError />
                        </TextField>
                    </article>
                    <article>
                        <h2>Description</h2>
                        <TextField aria-label="Product description" isRequired onBlur={(e) => { setData({ ...data, description: e.target.value }) }}>
                            <TextArea placeholder="Fill in a description" />
                            <FieldError />
                        </TextField>
                    </article>
                    <article>
                        <h2>Specs</h2>
                        <SpecsDropdown
                            label="Brand"
                            values={selectOptions.brands}
                            selected={data}
                            setSelected={setData}
                        />
                        <SpecsDropdown
                            label="Type"
                            values={selectOptions.guitar_types}
                            selected={data}
                            setSelected={setData}
                        />
                        <SpecsDropdown
                            label="Body"
                            values={selectOptions.materials}
                            selected={data}
                            setSelected={setData}
                        />
                        <SpecsDropdown
                            label="Neck"
                            values={selectOptions.materials}
                            selected={data}
                            setSelected={setData}
                        />
                        <SpecsDropdown
                            label="Fingerboard"
                            values={selectOptions.materials}
                            selected={data}
                            setSelected={setData}
                        />


                        <DatePicker name="date" isRequired onChange={date => setData({ ...data, date: date.toLocaleString('en-GB') })}>
                            <div>
                                <Label>Release Date</Label>
                                <Group>
                                    <I18nProvider locale="en-GB">
                                        <DateInput>
                                            {(segment) => <DateSegment segment={segment} />}
                                        </DateInput>
                                    </I18nProvider>
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


                        <SpecsDropdown
                            label="Country"
                            values={selectOptions.countries}
                            selected={data}
                            setSelected={setData}
                        />

                    </article>
                    <article>
                        <h2>Features</h2>
                        <ul>
                            <li>
                                <TextField aria-label="Product feature">
                                    <Input placeholder="Fill in a feature" />
                                </TextField>
                            </li>
                        </ul>
                    </article>
                </section>
            }
        </>
    );
}