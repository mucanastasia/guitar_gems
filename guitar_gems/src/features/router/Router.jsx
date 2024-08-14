import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRouteContainer } from './containers/PrivateRouteContainer';
import { ScrollToTop } from '@helpers/ScrollToTop';
import { AppLayoutContainer } from './containers/AppLayoutContainer';
import { CataloguePage } from '@features/catalogue';
import { ProductPage } from '@features/product';
import {
	ROOT_PATH,
	SIGN_IN_PATH,
	SIGN_UP_PATH,
	GUITAR_PATH,
	FAVOURITES_PATH,
	ADD_GUITAR_PATH,
	EDIT_GUITAR_PATH,
} from '@features/router/constants/routePaths';
import { useUser } from '@api/useUser';
import { Spinner } from '@ui/spinner';

const FavouritesPage = lazy(async () => ({
	default: (await import('@features/favourites')).FavouritesPage,
}));
const EditGuitarPage = lazy(async () => ({
	default: (await import('@features/editor')).EditGuitarPage,
}));
const AddGuitarPage = lazy(async () => ({
	default: (await import('@features/editor')).AddGuitarPage,
}));
const SignInPage = lazy(async () => ({
	default: (await import('@features/auth')).SignInPage,
}));
const SignUpPage = lazy(async () => ({
	default: (await import('@features/auth')).SignUpPage,
}));
const NotFoundPage = lazy(async () => ({
	default: (await import('@features/not-found')).NotFoundPage,
}));

export function Router() {
	const { data: user } = useUser();
	const isUserEditor = user?.app_metadata.role === 'editor';

	return (
		<BrowserRouter>
			<ScrollToTop />

			<AppLayoutContainer>
				<Suspense fallback={<Spinner />}>
					<Switch>
						<Route exact path={ROOT_PATH}>
							<CataloguePage />
						</Route>

						<Route path={SIGN_IN_PATH}>
							{!user ? <SignInPage /> : <Redirect push to="/" />}
						</Route>

						<Route path={SIGN_UP_PATH}>
							{!user ? <SignUpPage /> : <Redirect push to="/" />}
						</Route>

						<Route path={GUITAR_PATH}>
							<ProductPage />
						</Route>

						<PrivateRouteContainer path={FAVOURITES_PATH}>
							<FavouritesPage />
						</PrivateRouteContainer>

						<PrivateRouteContainer path={ADD_GUITAR_PATH}>
							{isUserEditor ? <AddGuitarPage /> : <Redirect push to={ROOT_PATH} />}
						</PrivateRouteContainer>

						<PrivateRouteContainer path={EDIT_GUITAR_PATH}>
							{isUserEditor ? <EditGuitarPage /> : <Redirect push to={ROOT_PATH} />}
						</PrivateRouteContainer>

						<Route path="*">
							<NotFoundPage />
						</Route>
					</Switch>
				</Suspense>
			</AppLayoutContainer>
		</BrowserRouter>
	);
}
