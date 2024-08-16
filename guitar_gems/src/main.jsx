import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@features/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@features/auth/context/AuthContext';
import { ThemeProvider } from './helpers/ThemeContext';
import { SelectedFiltersProvider } from '@features/catalogue/contexts/SelectedFiltersContext';
import ErrorBoundary from '@helpers/ErrorBoundary';
import './main.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 15 * 60 * 1000,
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
});

const App = () => {
	return (
		<ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<AuthProvider>
						<SelectedFiltersProvider>
							<Router />
						</SelectedFiltersProvider>
					</AuthProvider>
				</ThemeProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ErrorBoundary>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
