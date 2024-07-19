import { createContext, useState, useContext } from 'react';

const EditorDataContext = createContext(null);

export const useEditorData = () => useContext(EditorDataContext);

const GuitarDataProvider = ({ children }) => {
	const [data, setData] = useState({
		name: '',
		description: '',
		brand_id: '',
		type_id: '',
		body_material_id: '',
		neck_material_id: '',
		fingerboard_material_id: '',
		release_date: '',
		country_id: '',
		main_img: '',
		features: [],
	});

	const [uploadingPhoto, setUploadingPhoto] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

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
			}}>
			{children}
		</EditorDataContext.Provider>
	);
};

export default GuitarDataProvider;
