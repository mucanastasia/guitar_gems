import './hero.css';
import shadowImg from './assets/shadow.png';

export default function Hero({ name, brand, img }) {
    return (
        <section className="product-hero">
            <div className="wrap">
                <div className="product-name">
                    <p>{brand}</p>
                    <h1>{name}</h1>
                </div>
                <div className="main-img" style={{ backgroundImage: `url(${img})` }} />
                <img className="shadow-img" src={shadowImg} />
            </div>
        </section>
    );
}