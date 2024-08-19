export const getComparisonFromLS = () => {
    return JSON.parse(localStorage.getItem('comparison'));
};

export const setComparisonToLS = (comparison) => {
    localStorage.setItem('comparison', JSON.stringify(comparison));
};

export const checkCompareBarInLS = () => {
    return localStorage.getItem('CompareBar.open') !== null;
};

export const getCompareBarOpenFromLS = () => {
    return JSON.parse(localStorage.getItem('CompareBar.open'));
};

export const setCompareBarOpenToLS = (isOpen) => {
    localStorage.setItem('CompareBar.open', JSON.stringify(isOpen));
};

export const removeComparisonFromLS =() => {
    localStorage.removeItem('comparison');
	localStorage.removeItem('CompareBar.open');
};
