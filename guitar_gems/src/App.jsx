import Header from './components/header/Header';
import Footer from './components/footer/Footer';
// import Product from './components/product/Product';
import Catalogue from './components/catalogue/Catalogue';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SingUp';
import './App.css';
import AuthPage from './components/auth/AuthPage';

export default function App() {
  return (
    <>
      <Header />
      <Catalogue />
      {/* <Product guitarId={2} /> */}
      <Footer />

      <AuthPage>
        <SignIn />
      </AuthPage>
    </>
  );
}