import { useGuitar } from '../contexts/GuitarContext';
import { ProductContent } from '../components/product-content';
import { formatDate, formatDescription } from '../helpers/productContentHelpers';
import { SPECS_LABELS } from '../constants/specsNames';

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
		[SPECS_LABELS.BRAND, brand.name],
		[SPECS_LABELS.TYPE, type.name],
		[SPECS_LABELS.BODY, body_material.name],
		[SPECS_LABELS.NECK, neck_material.name],
		[SPECS_LABELS.FINGERBOARD, fingerboard_material.name],
		[SPECS_LABELS.RELEASE_DATE, releaseDate],
		[SPECS_LABELS.COUNTRY, country.name],
	];

	return (
		<ProductContent
			description={formattedDescription}
			specs={specsList}
			features={features}
		/>
	);
}
