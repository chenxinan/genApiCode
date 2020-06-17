const {
    isTS,
    genMock,
    outputDir,
    baseApi,
    doc,
    content
} = require('../../genApi.config.js')

module.exports = {

    import() {
        const dir = baseApi.dir.replace(/^\./, '@');
        return `import ${baseApi.var} from '${dir}'` + '\n\n'
    },

    title(title) {
        return `/** \n * ${title}\n **/\n\n`
    },

}