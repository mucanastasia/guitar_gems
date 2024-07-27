export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const options = { month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return `${day} ${formattedDate}`;
};

export const formatDescription = (description) => {
    const filteredDescription = description.replace(/\n{2,}/g, '\n');
    return filteredDescription.split('\n');
};