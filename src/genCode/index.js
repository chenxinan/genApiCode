const {
    isTS,
    genMock,
    outputDir,
    baseApi,
    doc,
    content
} = require('../../genApi.config.js');
// const doc = require('./doc');
const js = require('./js');
const ts = require('./ts');
const file = require('./file');


module.exports = {
    // doc,
    // js,
    // ts,
    api(data) {
        return (isTS ? ts : js)(data);
    },
    file,
    // mock
}