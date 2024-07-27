import { createContext, useContext } from 'react';

const SelectOptionsContext = createContext();

export const useSelectOptions = () => useContext(SelectOptionsContext);

export const SelectOptionsProvider = ({ children, selectOptions }) => {
	return <SelectOptionsContext.Provider value={{ selectOptions }}>{children}</SelectOptionsContext.Provider>;
};
