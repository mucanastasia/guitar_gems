import { createContext, useContext } from 'react';

export const GuitarsContext = createContext();

export const useGuitars = () => useContext(GuitarsContext);

export const GuitarsProvider = ({ children, ...props }) => {
	return (
		<GuitarsContext.Provider value={{ ...props }}>{children}</GuitarsContext.Provider>
	);
};
