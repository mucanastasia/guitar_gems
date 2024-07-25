import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSession } from './components/auth/contexts/SessionContext';
import Product from './components/product/Product';
import Catalogue from './components/catalogue/Catalogue';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SingUp';
import AuthPage from './components/auth/AuthPage';
import PrivateRoute from './components/auth/PrivateRoute';
import ScrollToTop from './components/product/ScrollToTop';
import { FiltersProvider } from './components/catalogue/contexts/FiltersContext';
import AddGuitar from './components/editor/AddGuitar';
import EditGuitar from './components/editor/EditGuitar';
import Editor from './components/editor/Editor';
import NotFoundPage from './components/product/NotFoundPage';
import './App.css';
import { Footer } from '@features/footer';
import { Header } from '@features/header';

export default function App() {
	const { user } = useSession();

	return (
		<Router>
			<ScrollToTop />
			<Switch>
				<Route exact path="/">
					<>
						<Header />
						<FiltersProvider>
							<Catalogue />
						</FiltersProvider>
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
							<AddGuitar>
								<Editor />
							</AddGuitar>
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
							<EditGuitar>
								<Editor />
							</EditGuitar>
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
