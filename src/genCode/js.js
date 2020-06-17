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
    // code
    return (
        genJSDoc(data) +
        `export function ${data.name}(${data.dataKey}) {\n` +
        `  return ${baseApi.var}({\n` +
        `    method: "${data.method}",\n` +
        "    url: `" + data.url + "`,\n" +
        (data.dataKey && `    ${data.dataKey},\n`) +
        `  });\n` +
        `}\n\n`
    );
}


module.exports = api