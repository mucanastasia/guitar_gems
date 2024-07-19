import './styles/productCard.css';
import PropTypes from 'prop-types';
export default function ProductCard({ brandName, guitarName, mainImg }) {
	return (
		<section className="product-card">
			<img
				className="product-card-img"
				src={mainImg}
				alt={`${brandName} ${guitarName} image`}
			/>
			<p>{brandName}</p>
			<h3>{guitarName}</h3>
		</section>
	);
}

ProductCard.propTypes = {
	brandName: PropTypes.string.isRequired,
	guitarName: PropTypes.string.isRequired,
	mainImg: PropTypes.string.isRequired,
};
