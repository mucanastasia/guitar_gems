import './styles/productCard.css';
import PropTypes from 'prop-types';
export default function ProductCard({ guitarData }) {
	return (
		<section className="product-card">
			<img
				className="product-card-img"
				src={guitarData.main_img}
				alt={`${guitarData.brand_name} ${guitarData.name} image`}
			/>
			<p>{guitarData.brand_name}</p>
			<h3>{guitarData.name}</h3>
		</section>
	);
}

ProductCard.propTypes = {
	guitarData: PropTypes.object.isRequired,
};
