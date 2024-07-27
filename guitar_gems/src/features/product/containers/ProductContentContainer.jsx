import { useGuitar } from '../contexts/GuitarContext';
import { ProductContent } from '../components/product-content';
import { formatDate, formatDescription } from '../helpers/productContentHelpers';
import { SPECS } from '../constants/specsNames';

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
		[SPECS.BRAND, brand.name],
		[SPECS.TYPE, type.name],
		[SPECS.BODY, body_material.name],
		[SPECS.NECK, neck_material.name],
		[SPECS.FINGERBOARD, fingerboard_material.name],
		[SPECS.RELEASE_DATE, releaseDate],
		[SPECS.COUNTRY, country.name],
	];

	return (
		<ProductContent
			description={formattedDescription}
			specs={specsList}
			features={features}
		/>
	);
}
