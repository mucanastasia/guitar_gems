import SpecsDropdown from './SpecsDropdown';
import MyDatePicker from './MyDatePicker';
import Features from './Features';
import NameSection from './NameSection';
import DescriptionSection from './DescriptionSection';
import SpecsSection from './SpecsSection';
import '../styles/editorContent.css';

export default function EditorContent() {
	return (
		<section className="product-content edit-content">
			<NameSection />

			<DescriptionSection />

			<SpecsSection>
				<SpecsDropdown label="Brand" objectKey="brand_id" options="brands" />
				<SpecsDropdown label="Type" objectKey="type_id" options="guitar_types" />
				<SpecsDropdown label="Body" objectKey="body_material_id" options="materials" />
				<SpecsDropdown label="Neck" objectKey="neck_material_id" options="materials" />
				<SpecsDropdown label="Fingerboard" objectKey="fingerboard_material_id" options="materials" />
				<MyDatePicker label="Release Date" objectKey="release_date" />
				<SpecsDropdown label="Country" objectKey="country_id" options="countries" />
			</SpecsSection>

			<Features />
		</section>
	);
}
