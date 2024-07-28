import { createContext, useContext } from 'react';

const UploadingPhotoContext = createContext();

export const useUploadingPhoto = () => useContext(UploadingPhotoContext);

export const UploadingPhotoProvider = ({ children, ...props }) => {
	return (
		<UploadingPhotoContext.Provider value={{ ...props }}>
			{children}
		</UploadingPhotoContext.Provider>
	);
};
