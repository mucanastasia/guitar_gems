import {
	Button as AriaButton,
	CalendarCell,
	CalendarGrid,
	DateInput,
	DateRangePicker as AriaDateRangePicker,
	DateSegment,
	Dialog,
	Group,
	Heading,
	Label,
	Popover as AriaPopover,
	RangeCalendar,
} from 'react-aria-components';
import { I18nProvider } from 'react-aria';
import { Icon } from '@ui/icon';
import './DateRangePicker.css';

export function DateRangePicker({ onChange, maxValue, value, onClear }) {
	return (
		<AriaDateRangePicker
			onChange={onChange}
			maxValue={maxValue}
			value={value}
			aria-label="Release date range picker">
			<Label>Release date</Label>
			<Group>
				<section>
					<I18nProvider locale="en-GB">
						<DateInput slot="start">
							{(segment) => <DateSegment segment={segment} />}
						</DateInput>
						<span aria-hidden="true">–</span>
						<DateInput slot="end">
							{(segment) => <DateSegment segment={segment} />}
						</DateInput>
					</I18nProvider>
				</section>
				<AriaButton>
					<Icon name="calendar_month" color="black" size="small" />
				</AriaButton>
			</Group>
			<AriaPopover>
				<Dialog>
					<RangeCalendar visibleDuration={{ months: 2 }}>
						<section>
							<I18nProvider locale="en-GB">
								<Label>From:</Label>
								<DateInput slot="start">
									{(segment) => <DateSegment segment={segment} />}
								</DateInput>
								<Label>To:</Label>
								<DateInput slot="end">
									{(segment) => <DateSegment segment={segment} />}
								</DateInput>
							</I18nProvider>
							<button className="secondary-button" onClick={onClear}>
								Clear selected dates
							</button>
						</section>
						<header>
							<AriaButton slot="previous">
								<Icon name="chevron_left" color="grey" size="medium" />
							</AriaButton>
							<Heading />
							<AriaButton slot="next">
								<Icon name="chevron_right" color="grey" size="medium" />
							</AriaButton>
						</header>
						<div style={{ display: 'flex', gap: 30, overflow: 'auto' }}>
							<CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
							<CalendarGrid offset={{ months: 1 }}>
								{(date) => <CalendarCell date={date} />}
							</CalendarGrid>
						</div>
					</RangeCalendar>
				</Dialog>
			</AriaPopover>
		</AriaDateRangePicker>
	);
}
