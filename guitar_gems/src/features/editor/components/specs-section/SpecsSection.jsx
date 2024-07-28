import { SpecsContainer } from '../../containers/SpecsContainer';
import { SpecItemContainer } from '../../containers/SpecItemContainer';
import { DatePickerContainer } from '../../containers/DatePickerContainer';
import {
	SPEC_LABEL_BRAND,
	SPEC_LABEL_TYPE,
	SPEC_LABEL_BODY,
	SPEC_LABEL_NECK,
	SPEC_LABEL_FINGERBOARD,
	SPEC_LABEL_RELEASE_DATE,
	SPEC_LABEL_COUNTRY,
} from '@features/product/constants/specNames';

//TODO: Think how the SpecItemContainer[s] can get the information about guitarKey and optionsKey

export function SpecsSection() {
	return (
		<>
			<SpecsContainer>
				<SpecItemContainer
					label={SPEC_LABEL_BRAND}
					guitarKey="brand_id"
					optionsKey="brands"
				/>
				<SpecItemContainer
					label={SPEC_LABEL_TYPE}
					guitarKey="type_id"
					optionsKey="guitar_types"
				/>
				<SpecItemContainer
					label={SPEC_LABEL_BODY}
					guitarKey="body_material_id"
					optionsKey="materials"
				/>
				<SpecItemContainer
					label={SPEC_LABEL_NECK}
					guitarKey="neck_material_id"
					optionsKey="materials"
				/>
				<SpecItemContainer
					label={SPEC_LABEL_FINGERBOARD}
					guitarKey="fingerboard_material_id"
					optionsKey="materials"
				/>
				<SpecItemContainer
					label={SPEC_LABEL_COUNTRY}
					guitarKey="country_id"
					optionsKey="countries"
				/>
			</SpecsContainer>
			<DatePickerContainer label={SPEC_LABEL_RELEASE_DATE} guitarKey="release_date" />
		</>
	);
}
