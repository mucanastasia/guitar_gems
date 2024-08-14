import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRouteContainer } from './containers/PrivateRouteContainer';
import { ScrollToTop } from '@helpers/ScrollToTop';
import { AppLayoutContainer } from './containers/AppLayoutContainer';
import { CataloguePage } from '@features/catalogue';
import { SignInPage } from '@features/auth';
import { SignUpPage } from '@features/auth';
import { ProductPage } from '@features/product';
import { NotFoundPage } from '@features/not-found';
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

const FavouritesPage = lazy(() =>
	import('@features/favourites').then((module) => ({ default: module.FavouritesPage }))
);
const EditGuitarPage = lazy(() =>
	import('@features/editor').then((module) => ({ default: module.EditGuitarPage }))
);
const AddGuitarPage = lazy(() =>
	import('@features/editor').then((module) => ({ default: module.AddGuitarPage }))
);

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
