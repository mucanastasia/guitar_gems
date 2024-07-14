import {
	Calendar,
	CalendarCell,
	CalendarGrid,
	DateInput,
	DatePicker,
	DateSegment,
	Dialog,
	Group,
	Heading,
	Label,
	Popover,
	Button,
	FieldError,
} from 'react-aria-components';
import { I18nProvider } from 'react-aria';
import { parseDate } from '@internationalized/date';
import './styles/datePicker.css';

export default function MyDatePicker({ label, objectKey, data, setData }) {
	const parsedDate = data[objectKey] ? parseDate(data[objectKey]) : null;

	return (
		<DatePicker
			name="date"
			isRequired
			value={parsedDate}
			onChange={(date) =>
				setData({ ...data, [objectKey]: date.toLocaleString('en-GB') })
			}>
			<div>
				<Label>{label}</Label>
				<Group>
					<I18nProvider locale="en-GB">
						<DateInput>
							{(segment) => <DateSegment segment={segment} />}
						</DateInput>
					</I18nProvider>
					<Button className="react-aria-Button material-symbols-outlined">
						calendar_month
					</Button>
				</Group>
			</div>
			<FieldError />
			<Popover>
				<Dialog>
					<Calendar>
						<header>
							<Button slot="previous">
								<span className="material-symbols-outlined">chevron_left</span>
							</Button>
							<Heading />
							<Button slot="next">
								<span className="material-symbols-outlined">chevron_right</span>
							</Button>
						</header>
						<CalendarGrid>
							{(date) => <CalendarCell date={date} />}
						</CalendarGrid>
					</Calendar>
				</Dialog>
			</Popover>
		</DatePicker>
	);
}
