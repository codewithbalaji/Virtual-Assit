module.exports = (response) => {
    return response
    .replace(/[^\w\s]/gi, '')
};
