import { createContext, useContext, useState } from 'react';

export const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<DrawerContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</DrawerContext.Provider>
	);
};
