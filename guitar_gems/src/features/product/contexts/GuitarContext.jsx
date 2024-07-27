import { createContext, useContext } from 'react';

export const GuitarContext = createContext();

export const useGuitar = () => useContext(GuitarContext);

export const GuitarProvider = ({ children, guitar }) => {
	return <GuitarContext.Provider value={{ guitar }}>{children}</GuitarContext.Provider>;
};
