export const prepareFilter = (selectedList, fieldNames) => {
    const filter = selectedList
        .map((id) => fieldNames.map((fieldName) => `${fieldName}.eq.${id}`).join(','))
        .join(',');
    return filter;
};