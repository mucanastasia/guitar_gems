import SpecsItemContainer from './SpecsItemContainer';
import Features from './Features';
import NameSection from './NameSection';
import DescriptionSection from './DescriptionSection';
import SpecsSection from './SpecsSection';
import { parseDate } from '@internationalized/date';
import { useEditorData } from '../contexts/EditorDataContext';
import { DatePicker } from '@ui/date-picker';
import '../styles/editorContent.css';

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
				<SpecsItemContainer label="Brand" objectKey="brand_id" options="brands" />
				<SpecsItemContainer label="Type" objectKey="type_id" options="guitar_types" />
				<SpecsItemContainer
					label="Body"
					objectKey="body_material_id"
					options="materials"
				/>
				<SpecsItemContainer
					label="Neck"
					objectKey="neck_material_id"
					options="materials"
				/>
				<SpecsItemContainer
					label="Fingerboard"
					objectKey="fingerboard_material_id"
					options="materials"
				/>
				<DatePicker label="Release Date" value={parsedDate} onChange={handleDateChange} />
				<SpecsItemContainer label="Country" objectKey="country_id" options="countries" />
			</SpecsSection>

			<Features />
		</section>
	);
}
