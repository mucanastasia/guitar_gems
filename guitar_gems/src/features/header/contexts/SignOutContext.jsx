import { createContext, useContext } from 'react';

export const SignOutContext = createContext();

export const useSignOut = () => useContext(SignOutContext);

export const SignOutProvider = ({ children, loading, handleSignOut }) => {
	return (
		<SignOutContext.Provider value={{ loading, handleSignOut }}>
			{children}
		</SignOutContext.Provider>
	);
};
