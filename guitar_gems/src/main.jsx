import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@features/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@features/auth/context/AuthContext';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 0,
			retry: false,
			refetchOnMount: 'always',
			refetchOnWindowFocus: 'always',
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router />
				<ReactQueryDevtools initialIsOpen={false} />
			</AuthProvider>
		</QueryClientProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
