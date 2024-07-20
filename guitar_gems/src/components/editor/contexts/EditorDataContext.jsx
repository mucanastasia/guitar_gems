import { createContext, useContext } from 'react';

const EditorDataContext = createContext(null);

export const useEditorData = () => useContext(EditorDataContext);

const GuitarDataProvider = ({
	children,
	data,
	setData,
	loading,
	setLoading,
	uploadingPhoto,
	setUploadingPhoto,
	error,
	setError,
	displayButtonLabel,
	handleSubmit,
	title,
	handleCancelClick,
	id = null,
}) => {
	return (
		<EditorDataContext.Provider
			value={{
				data,
				setData,
				loading,
				setLoading,
				uploadingPhoto,
				setUploadingPhoto,
				error,
				setError,
				displayButtonLabel,
				handleSubmit,
				title,
				handleCancelClick,
				id,
			}}>
			{children}
		</EditorDataContext.Provider>
	);
};

export default GuitarDataProvider;
