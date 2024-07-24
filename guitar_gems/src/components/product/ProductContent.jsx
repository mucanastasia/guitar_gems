/* eslint-disable react/prop-types */
import { Text } from '@ui/text';
import './styles/productContent.css';
import { HeadingMedium } from '@ui/heading';
import { Label } from '@ui/label';

export default function ProductContent({ guitarData }) {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const options = { month: 'long', year: 'numeric' };
		const formattedDate = date.toLocaleDateString('en-GB', options);
		return `${day} ${formattedDate}`;
	};

	const renderSpecs = () => {
		const formattedDate = formatDate(guitarData.release_date);

		const data = [
			['Brand', guitarData.brand.name],
			['Type', guitarData.type.name],
			['Body', guitarData.body_material.name],
			['Neck', guitarData.neck_material.name],
			['Fingerboard', guitarData.fingerboard_material.name],
			['Release date', formattedDate],
			['Country', guitarData.country.name],
		];

		return data.map((row) => (
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
		return guitarData.features.map((feature) => (
			<li key={feature}>
				<Text size="xsmall">{feature}</Text>
			</li>
		));
	};

	const renderDescription = () => {
		const filteredDescription = guitarData.description.replace(/\n{2,}/g, '\n');

		return filteredDescription.split('\n').map((paragraph, index) => {
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

	return (
		<section className="product-content">
			<article>
				<HeadingMedium text="Description" />
				{renderDescription()}
			</article>
			<article>
				<HeadingMedium text="Specs" />
				<table>
					<tbody>{renderSpecs()}</tbody>
				</table>
			</article>
			{guitarData.features?.length > 0 && (
				<article>
					<HeadingMedium text="Features" />
					<ul>{renderFeatures()}</ul>
				</article>
			)}
		</section>
	);
}
