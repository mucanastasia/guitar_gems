import {
	Calendar,
	CalendarCell,
	CalendarGrid,
	DateInput,
	DatePicker as AriaDatePicker,
	DateSegment,
	Dialog,
	Group,
	Heading,
	Popover as AriaPopover,
	Button,
	FieldError,
} from 'react-aria-components';
import { I18nProvider } from 'react-aria';
import './DatePicker.css';
import { Label } from '@ui/label';
import { Icon } from '@ui/icon';

export function DatePicker({ label, value, onChange }) {
	return (
		<AriaDatePicker name="date" isRequired value={value} onChange={onChange}>
			<div>
				<Label>{label}</Label>
				<Group>
					<I18nProvider locale="en-GB">
						<DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
					</I18nProvider>
					<Button>
						<Icon name="calendar_month" size="small" />
					</Button>
				</Group>
			</div>
			<FieldError />
			<AriaPopover>
				<Dialog>
					<I18nProvider locale="en-GB">
						<Calendar>
							<header>
								<Button slot="previous">
									<Icon name="keyboard_arrow_left" size="medium" color="grey" />
								</Button>
								<Heading />
								<Button slot="next">
									<Icon name="keyboard_arrow_right" size="medium" color="grey" />
								</Button>
							</header>
							<CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
						</Calendar>
					</I18nProvider>
				</Dialog>
			</AriaPopover>
		</AriaDatePicker>
	);
}
