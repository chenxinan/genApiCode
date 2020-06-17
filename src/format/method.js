module.exports = function formatMethod(data) {
    const method = (data.method || 'get').toLocaleLowerCase();
    return method;
}