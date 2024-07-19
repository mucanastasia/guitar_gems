import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useSession } from './contexts/SessionContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Product from './components/product/Product';
import Catalogue from './components/catalogue/Catalogue';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SingUp';
import AuthPage from './components/auth/AuthPage';
import PrivateRoute from './components/auth/PrivateRoute';
import ScrollToTop from './components/product/ScrollToTop';
import Editor from './components/editor/Editor';
import EditGuitar from './components/editor/EditGuitar';
import NotFoundPage from './components/product/NotFoundPage';
import './App.css';

export default function App() {
	const { user } = useSession();

	return (
		<Router>
			<ScrollToTop />
			<Switch>
				<Route exact path="/">
					<>
						<Header />
						<Catalogue />
						<Footer />
					</>
				</Route>

				<Route path="/sign-in">
					{!user ? (
						<>
							<AuthPage>
								<SignIn />
							</AuthPage>
						</>
					) : (
						<Redirect push to="/" />
					)}
				</Route>

				<Route path="/sign-up">
					{!user ? (
						<>
							<AuthPage>
								<SignUp />
							</AuthPage>
						</>
					) : (
						<Redirect push to="/" />
					)}
				</Route>

				<Route path="/guitars/:id">
					<>
						<Header />
						<Product />
						<Footer />
					</>
				</Route>

				<PrivateRoute path="/editor/add-new-guitar">
					{user?.app_metadata.role === 'editor' ? (
						<>
							<Header />
							<Editor />
							<Footer />
						</>
					) : (
						<Redirect push to="/" />
					)}
				</PrivateRoute>

				<PrivateRoute path="/editor/edit-guitar/:id">
					{user?.app_metadata.role === 'editor' ? (
						<>
							<Header />
							<EditGuitar />
							<Footer />
						</>
					) : (
						<Redirect push to="/" />
					)}
				</PrivateRoute>
				<Route path="*">
					<Header />
					<NotFoundPage />
					<Footer />
				</Route>
			</Switch>
		</Router>
	);
}
