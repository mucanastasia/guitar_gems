import Header from './components/header/Header';
import Footer from './components/footer/Footer';
// import Product from './components/product/Product';
import Catalogue from './components/catalogue/Catalogue';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      {/* <Product guitarId={7} /> */}
      <Catalogue />
      <Footer />
    </>
  );
}