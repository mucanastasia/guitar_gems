import React from 'react';
import ReactDOM from 'react-dom/client';
import { SessionProvider } from '@features/auth/contexts/SessionContext.jsx';
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
		<SessionProvider>
			<App />
		</SessionProvider>
	</React.StrictMode>
);
