import { useState } from 'react';
import { Button, CalendarCell, CalendarGrid, DateInput, DateRangePicker, DateSegment, Dialog, Group, Heading, Label, Popover, RangeCalendar } from 'react-aria-components';
import './styles/dateRangePicker.css';
import { I18nProvider } from 'react-aria';

export default function MyDateRangePicker({ selected, setSelected }) {

    return (
        <DateRangePicker onChange={(e) => { setSelected({ ...selected, date_from: e.start.toLocaleString('en-GB'), date_to: e.end.toLocaleString('en-GB') }) }} >
            <Label>Release date</Label>
            <Group>
                <section>
                    <I18nProvider locale="en-GB">
                        <DateInput slot="start">
                            {(segment) => <DateSegment segment={segment} />}
                        </DateInput>
                        <span aria-hidden="true"> - </span>
                        <DateInput slot="end">
                            {(segment) => <DateSegment segment={segment} />}
                        </DateInput>
                    </I18nProvider>
                </section>
                <Button className="react-aria-Button material-symbols-outlined">calendar_month</Button>
            </Group>
            <Popover>
                <Dialog>
                    <RangeCalendar>
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
                    </RangeCalendar>
                </Dialog>
            </Popover>
        </DateRangePicker>

    );
}