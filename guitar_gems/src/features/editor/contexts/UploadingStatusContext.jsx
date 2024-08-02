import { createContext, useContext } from 'react';

const UploadingStatusContext = createContext();

export const useUploadingStatus = () => useContext(UploadingStatusContext);

export const UploadingStatusProvider = ({ children, ...props }) => {
	return (
		<UploadingStatusContext.Provider value={{ ...props }}>
			{children}
		</UploadingStatusContext.Provider>
	);
};
