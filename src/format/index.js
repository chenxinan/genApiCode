const formatMethod = require('./method')
const formatParam = require('./param')
const formatUrl = require('./url')
const formatName = require('./name')
const formatDataKey = require('./dataKey')

module.exports = function format(data) {
    data.method = formatMethod(data);
    data.param = formatParam(data);
    data.dataKey = formatDataKey(data);
    data.url = formatUrl(data);
    data.name = formatName(data);
    return data;
}