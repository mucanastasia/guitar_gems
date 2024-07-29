import React from 'react';
import ReactDOM from 'react-dom/client';
import SessionProvider from '@features/auth/contexts/SessionContext.jsx';
import { Router } from '@features/router';

const App = () => {
	return <Router />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SessionProvider>
			<App />
		</SessionProvider>
	</React.StrictMode>
);
