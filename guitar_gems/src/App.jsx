import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSession } from "./contexts/SessionContext";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Product from './components/product/Product';
import Catalogue from './components/catalogue/Catalogue';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SingUp';
import AuthPage from './components/auth/AuthPage';
import PrivateRoute from "./components/auth/PrivateRoute";
import ScrollToTop from "./components/product/ScrollToTop";
import Editor from "./components/editor/Editor";
import './App.css';

export default function App() {
  const { user } = useSession();

  return (
    <Router>
      <ScrollToTop />
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

        <PrivateRoute path="/guitar_gems/hello">
          <Header />
          <h1>Hello there!</h1>
        </PrivateRoute>

        <PrivateRoute path="/guitar_gems/editor/add-new-guitar">
          {
            user?.app_metadata.role === 'editor'
              ? <>
                <Header />
                <Editor />
                <Footer />
              </>
              : <Redirect push to="/guitar_gems/" />
          }
        </PrivateRoute>

      </Switch>
    </Router >
  );
}