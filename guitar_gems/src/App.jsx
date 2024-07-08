import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Product from './components/product/Product';
import Catalogue from './components/catalogue/Catalogue';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SingUp';
import AuthPage from './components/auth/AuthPage';
import './App.css';
import PrivateRoute from "./components/auth/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/guitar_gems/">
          <>
            <Header />
            <Catalogue />
            <Footer />
          </>
        </Route>

        <Route path="/guitar_gems/sign-in">
          <AuthPage>
            <SignIn />
          </AuthPage>
        </Route>

        <Route path="/guitar_gems/sign-up">
          <AuthPage>
            <SignUp />
          </AuthPage>
        </Route>

        <Route path="/guitar_gems/guitars/:id">
          <>
            <Header />
            <Product />
            <Footer />
          </>
        </Route>

        <PrivateRoute path="/guitar_gems/no">
          <Header />
          <h1>Hello there!</h1>
        </PrivateRoute>

      </Switch>
    </Router >
  );
}