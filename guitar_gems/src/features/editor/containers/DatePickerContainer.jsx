import { parseDate } from '@internationalized/date';
import { useEditorData } from '../contexts/EditorDataContext';
import { DatePicker } from '@ui/date-picker';

export function DatePickerContainer({ label, guitarKey }) {
	const { data, setData } = useEditorData();

	const parsedDate = data[guitarKey] ? parseDate(data[guitarKey]) : null;

	const handleDateChange = (date) => {
		setData({ ...data, [guitarKey]: date.toLocaleString('en-GB') });
	};

	return <DatePicker label={label} value={parsedDate} onChange={handleDateChange} />;
}
