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
        <Route exact path="/">
          <>
            <Header />
            <Catalogue />
            <Footer />
          </>
        </Route>

        <Route path="/sign-in">
          <AuthPage>
            <SignIn />
          </AuthPage>
        </Route>

        <Route path="/sign-up">
          <AuthPage>
            <SignUp />
          </AuthPage>
        </Route>

        <Route path="/guitars/:id">
          <>
            <Header />
            <Product />
            <Footer />
          </>
        </Route>

        {/* To test private route */}
        <PrivateRoute path="/hello">
          <p>Hello!</p>
        </PrivateRoute>

      </Switch>
    </Router>
  );
}