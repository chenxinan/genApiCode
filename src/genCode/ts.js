const {
    isTS,
    genMock,
    outputDir,
    baseApi,
    doc,
    content
} = require('../../genApi.config.js')
const genJSDoc = require('./doc')

function api(data) {
    const {
        method,
        dataKey
    } = initApiData(data);
    // todo paramData resData
    const paramData = '{test: string}';
    const resData = 'string';
    const TSData = `: ${paramData}`;
    const TSRes = `: ${resData}`;
    // code
    return (
        genJSDoc(data) +
        `export function ${data.name}(${dataKey}${TSData})${TSRes} {\n` +
        `  return ${baseApi.var}({\n` +
        `    method: "${method}",\n` +
        `    url: "${data.url}",\n` +
        `    ${dataKey}: ${dataKey},\n` +
        `  });\n` +
        `}\n\n`
    );
}

module.exports = api