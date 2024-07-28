import { createContext, useContext } from 'react';

const EditorDataContext = createContext(null);

export const useEditorData = () => useContext(EditorDataContext);

const GuitarDataProvider = ({ children, ...props }) => {
	return (
		<EditorDataContext.Provider value={{ ...props }}>
			{children}
		</EditorDataContext.Provider>
	);
};

export default GuitarDataProvider;
