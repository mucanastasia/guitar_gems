import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@features/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
