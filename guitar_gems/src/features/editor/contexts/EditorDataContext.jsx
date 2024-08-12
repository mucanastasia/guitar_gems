import { createContext, useContext } from 'react';

const EditorDataContext = createContext();

export const useEditorData = () => useContext(EditorDataContext);

export const EditorDataProvider = ({ children, ...props }) => {
	return (
		<EditorDataContext.Provider value={{ ...props }}>
			{children}
		</EditorDataContext.Provider>
	);
};
