import { HeadingSmall } from '@ui/heading';
import PropTypes from 'prop-types';
import './styles/productCard.css';
export default function ProductCard({ brandName, guitarName, mainImg }) {
	return (
		<section className="product-card">
			<img
				className="product-card-img"
				src={mainImg}
				alt={`${brandName} ${guitarName} image`}
			/>
			<p>{brandName}</p>
			<HeadingSmall text={guitarName} />
		</section>
	);
}

ProductCard.propTypes = {
	brandName: PropTypes.string.isRequired,
	guitarName: PropTypes.string.isRequired,
	mainImg: PropTypes.string.isRequired,
};
