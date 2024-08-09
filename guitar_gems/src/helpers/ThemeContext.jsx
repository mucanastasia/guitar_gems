import { createContext, useContext, useState, useEffect } from 'react';
import { getThemeFromLocalStorage, setThemeInLocalStorage } from './localstorageHelpers';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState();

	useEffect(() => {
		const themeFromLS = getThemeFromLocalStorage();
		console.log('themeFromLS', themeFromLS);
		if (themeFromLS === null) {
			const darkThemeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.setAttribute(
				'data-theme',
				darkThemeSystem ? 'dark' : 'light'
			);
			setTheme(darkThemeSystem ? 'dark' : 'light');
			console.log('darkThemeSystem', darkThemeSystem);
		} else if (themeFromLS !== null) {
			document.documentElement.setAttribute('data-theme', themeFromLS);
			setTheme(themeFromLS);
		}
	}, []);

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === 'light' ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', newTheme);
			setThemeInLocalStorage(newTheme);
			return newTheme;
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
