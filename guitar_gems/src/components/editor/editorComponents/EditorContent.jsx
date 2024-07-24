import SpecsDropdown from './SpecsDropdown';
import Features from './Features';
import NameSection from './NameSection';
import DescriptionSection from './DescriptionSection';
import SpecsSection from './SpecsSection';
import '../styles/editorContent.css';
import { parseDate } from '@internationalized/date';
import { useEditorData } from '../contexts/EditorDataContext';
import { DatePicker } from '@ui/date-picker';

export default function EditorContent() {
	const { data, setData } = useEditorData();

	const parsedDate = data.release_date ? parseDate(data.release_date) : null;

	const handleDateChange = (date) => {
		setData({ ...data, release_date: date.toLocaleString('en-GB') });
	};

	return (
		<section className="product-content edit-content">
			<NameSection />

			<DescriptionSection />

			<SpecsSection>
				<SpecsDropdown label="Brand" objectKey="brand_id" options="brands" />
				<SpecsDropdown label="Type" objectKey="type_id" options="guitar_types" />
				<SpecsDropdown label="Body" objectKey="body_material_id" options="materials" />
				<SpecsDropdown label="Neck" objectKey="neck_material_id" options="materials" />
				<SpecsDropdown
					label="Fingerboard"
					objectKey="fingerboard_material_id"
					options="materials"
				/>
				<DatePicker label="Release Date" value={parsedDate} onChange={handleDateChange} />
				<SpecsDropdown label="Country" objectKey="country_id" options="countries" />
			</SpecsSection>

			<Features />
		</section>
	);
}
