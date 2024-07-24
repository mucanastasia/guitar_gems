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
	Popover as AriaPopover,
	Button,
	FieldError,
} from 'react-aria-components';
import { I18nProvider } from 'react-aria';
import { parseDate } from '@internationalized/date';
import { useEditorData } from '../contexts/EditorDataContext';
import '../styles/datePicker.css';
import { Label } from '@ui/label';
import { Icon } from '@ui/icon';

export default function MyDatePicker({ label, objectKey }) {
	const { data, setData } = useEditorData();
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
				</Dialog>
			</AriaPopover>
		</DatePicker>
	);
}
