/* eslint-disable react/prop-types */
import './styles/productCard.css';

export default function ProductCard({ guitarData }) {

    return (
        <section className="product-card">
            <img className="product-card-img" src={guitarData.main_img} alt={`${guitarData.brand?.name} ${guitarData.name} image`} />
            <p>{guitarData.brand?.name}</p>
            <h3>{guitarData.name}</h3>
        </section>
    );
}