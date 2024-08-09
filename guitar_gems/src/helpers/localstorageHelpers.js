export const getThemeFromLocalStorage = () => {
    return localStorage.getItem('theme') || null;
};

export const setThemeInLocalStorage = (theme) => {
    localStorage.setItem('theme', theme);
};