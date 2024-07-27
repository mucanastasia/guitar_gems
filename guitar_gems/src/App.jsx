import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSession } from '@features/auth/contexts/SessionContext';
// import Product from './components/product/Product';
import Catalogue from './components/catalogue/Catalogue';
import PrivateRoute from '@features/router/PrivateRoute';
import { ScrollToTop } from '@helpers/ScrollToTop';
import { FiltersProvider } from './components/catalogue/contexts/FiltersContext';
import AddGuitar from './components/editor/AddGuitar';
import EditGuitar from './components/editor/EditGuitar';
import Editor from './components/editor/Editor';
import { NotFoundPage } from '@features/not-found';
import './App.css';
import { Footer } from '@features/footer';
import { Header } from '@features/header';
import { SignInPage } from '@features/auth';
import { SignUpPage } from '@features/auth';
import { ProductPage } from '@features/product';

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

				<Route path="/sign-in">{!user ? <SignInPage /> : <Redirect push to="/" />}</Route>

				<Route path="/sign-up">{!user ? <SignUpPage /> : <Redirect push to="/" />}</Route>

				<Route path="/guitars/:id">
					<>
						<Header />
						<ProductPage />
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
