import { HeadingMedium } from '@ui/heading';
import { Text } from '@ui/text';
import { Label } from '@ui/label';
import {
	HEADING_DESCRIPTION,
	HEADING_SPECS,
	HEADING_FEATURES,
} from '../../constants/productHeadingNames';
import './ProductContent.css';

export function ProductContent({ description, specs, features }) {
	const renderDescription = () => {
		return description.map((paragraph, index) => {
			if (paragraph.trim() !== '') {
				return (
					<Text key={index} size="xsmall">
						{paragraph}
					</Text>
				);
			}
			return null;
		});
	};

	const renderSpecs = () => {
		return specs.map((row) => (
			<tr key={row[0]}>
				<th>
					<Label>{row[0]}</Label>
				</th>
				<td>
					<Text size="xsmall">{row[1]}</Text>
				</td>
			</tr>
		));
	};

	const renderFeatures = () => {
		return features.map((feature) => (
			<li key={feature}>
				<Text size="xsmall">{feature}</Text>
			</li>
		));
	};

	return (
		<section className="product-content">
			<article>
				<HeadingMedium text={HEADING_DESCRIPTION} />
				{renderDescription()}
			</article>
			<article>
				<HeadingMedium text={HEADING_SPECS} />
				<table>
					<tbody>{renderSpecs()}</tbody>
				</table>
			</article>
			{features?.length > 0 && (
				<article>
					<HeadingMedium text={HEADING_FEATURES} />
					<ul>{renderFeatures()}</ul>
				</article>
			)}
		</section>
	);
}
