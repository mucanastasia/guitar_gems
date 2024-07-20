import {
	Button,
	CalendarCell,
	CalendarGrid,
	DateInput,
	DateRangePicker,
	DateSegment,
	Dialog,
	Group,
	Heading,
	Label,
	Popover,
	RangeCalendar,
} from 'react-aria-components';
import { I18nProvider } from 'react-aria';
import { getLocalTimeZone, today } from '@internationalized/date';
import { useFilters } from './contexts/FiltersContext';
import './styles/dateRangePicker.css';

export default function MyDateRangePicker({ setFilters }) {
	const { selectedFilters } = useFilters();
	const todayDate = today(getLocalTimeZone());

	const handleChange = (e) => {
		setFilters({ ...selectedFilters, date: e });
	};

	const handleResetDates = () => {
		setFilters({ ...selectedFilters, date: { start: null, end: null } });
	};

	return (
		<DateRangePicker
			onChange={handleChange}
			maxValue={todayDate}
			value={selectedFilters.date}
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
				<Button className="react-aria-Button material-symbols-outlined">
					calendar_month
				</Button>
			</Group>
			<Popover>
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
							<button onClick={handleResetDates}>Clear selected dates</button>
						</section>
						<header>
							<Button slot="previous">
								<span className="material-symbols-outlined">chevron_left</span>
							</Button>
							<Heading />
							<Button slot="next">
								<span className="material-symbols-outlined">chevron_right</span>
							</Button>
						</header>
						<div style={{ display: 'flex', gap: 30, overflow: 'auto' }}>
							<CalendarGrid>
								{(date) => <CalendarCell date={date} />}
							</CalendarGrid>
							<CalendarGrid offset={{ months: 1 }}>
								{(date) => <CalendarCell date={date} />}
							</CalendarGrid>
						</div>
					</RangeCalendar>
				</Dialog>
			</Popover>
		</DateRangePicker>
	);
}
