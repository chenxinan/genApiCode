// todo require
const config = require('../../genApi.config.js')
const cloneDeep = require('lodash/cloneDeep')

const configContents = cloneDeep(config.contents);

// (function initConfigMap() {
for (let i = 0; i < configContents.length; i++) {
    const config = configContents[i];
    const match = config.match
    if (Array.isArray(match)) {
        const addConfig = match.map(match => {
            return {
                ...config,
                match,
            }
        })
        configContents.splice(i, 1, ...addConfig);
        i += match.length - 1
    }
}
// })();

module.exports = configContents;