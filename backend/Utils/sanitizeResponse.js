module.exports = (response) => {
    return response
        .replace(/Google/g, 'virtual Assist')
        .replace(/I was created by Google/g, 'I was created by Balaji D')
        .replace(/Gemini/g, 'amy');
};
