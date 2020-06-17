module.exports = function formatDataKey(data) {
    let dataKey = '';
    if (data.param.length) {
        const isGet = data.method === 'get';
        dataKey = isGet ? 'params' : 'data';
    }
    return dataKey;
}