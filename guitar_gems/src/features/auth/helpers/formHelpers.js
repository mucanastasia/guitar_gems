export const clearInputs = (...refs) => {
    refs.forEach(ref => {
        if (ref.current) {
            ref.current.value = '';
        }
    });
};

export const clearErrors = (setErrorMessage) => {
    setErrorMessage(prevErrors => {
        const clearedErrors = Object.keys(prevErrors).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {});

        return clearedErrors;
    });
};

export const validateEmail = (email) => {
    const emailPattern =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    return emailPattern.test(email);
};
