import { useGuitar } from '../contexts/GuitarContext';
import { ProductContent } from '../components/product-content';
import { formatDate, formatDescription } from '../helpers/productContentHelpers';
import * as specNames from '../constants/specNames';

export function ProductContentContainer() {
	const { guitar } = useGuitar();
	const {
		release_date,
		description,
		brand,
		type,
		body_material,
		neck_material,
		fingerboard_material,
		country,
		features,
	} = guitar;

	const releaseDate = formatDate(release_date);

	const formattedDescription = formatDescription(description);

	const specsList = [
		[specNames.SPEC_LABEL_BRAND, brand.name],
		[specNames.SPEC_LABEL_TYPE, type.name],
		[specNames.SPEC_LABEL_BODY, body_material.name],
		[specNames.SPEC_LABEL_NECK, neck_material.name],
		[specNames.SPEC_LABEL_FINGERBOARD, fingerboard_material.name],
		[specNames.SPEC_LABEL_RELEASE_DATE, releaseDate],
		[specNames.SPEC_LABEL_COUNTRY, country.name],
	];

	return (
		<ProductContent
			description={formattedDescription}
			specs={specsList}
			features={features}
		/>
	);
}
