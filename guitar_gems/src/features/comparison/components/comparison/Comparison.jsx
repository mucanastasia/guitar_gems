import {
	SPEC_LABEL_BRAND,
	SPEC_LABEL_TYPE,
	SPEC_LABEL_BODY,
	SPEC_LABEL_NECK,
	SPEC_LABEL_FINGERBOARD,
	SPEC_LABEL_RELEASE_DATE,
	SPEC_LABEL_COUNTRY,
} from '@features/product/constants/specNames';
import { Label } from '@ui/label';
import { ProductCard } from '@ui/product-card';
import { Text } from '@ui/text';
import './Comparison.css';

export function Comparison({ guitarsToCompare, RemoveAction }) {
	return (
		<div className="comparison-container">
			<section className="cards">
				{guitarsToCompare.map((guitar) => (
					<ProductCard
						key={`${guitar?.id}_product_card`}
						brand={guitar?.brand.name}
						name={guitar?.name}
						image={guitar?.main_img}
						CardActions={RemoveAction && <RemoveAction id={guitar?.id} />}
					/>
				))}
			</section>
			<section className="specs">
				<article className="specs-labels">
					<Label>{SPEC_LABEL_BRAND}</Label>
					<Label>{SPEC_LABEL_TYPE}</Label>
					<Label>{SPEC_LABEL_BODY}</Label>
					<Label>{SPEC_LABEL_NECK}</Label>
					<Label>{SPEC_LABEL_FINGERBOARD}</Label>
					<Label>{SPEC_LABEL_COUNTRY}</Label>
					<Label>{SPEC_LABEL_RELEASE_DATE}</Label>
				</article>

				{guitarsToCompare.map((guitar) => (
					<article className="specs-content" key={`${guitar?.id}_specs`}>
						<Text size="xsmall">{guitar?.brand.name}</Text>
						<Text size="xsmall">{guitar?.type.name}</Text>
						<Text size="xsmall">{guitar?.body_material.name}</Text>
						<Text size="xsmall">{guitar?.neck_material.name}</Text>
						<Text size="xsmall">{guitar?.fingerboard_material.name}</Text>
						<Text size="xsmall">{guitar?.country.name}</Text>
						<Text size="xsmall">{guitar?.release_date}</Text>
					</article>
				))}
			</section>
			<section className="features">
				<article className="features-label">
					<Label>Features</Label>
				</article>

				{guitarsToCompare.map((guitar) => (
					<article className="features-content" key={`${guitar?.id}_features`}>
						{guitar?.features.length === 0 ? <Text size="xsmall">－</Text> : null}
						<ul>
							{guitar?.features.map((feature, index) => (
								<li key={index}>
									<Text size="xsmall">{feature}</Text>
								</li>
							))}
						</ul>
					</article>
				))}
			</section>
		</div>
	);
}
