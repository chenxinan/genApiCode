const Tokens = require('./tokens');
const parseTokenKey = require('./key');
const parseTokenValue = require('./value');
const configContents = require('./config');
const md = require('markdown-it')();

let test = false

function parseDoc(content) {
    // if (test) return {}
    // test = true
    const res = {};
    const matched = {};
    const mdTokens = md.parse(content);
    const tokens = new Tokens(mdTokens);
    tokens.traverse(() => {
        // 解析tokens 获取配置content里的key
        const config = parseTokenKey.get(configContents, tokens, matched);
        if (config === Tokens.OVER) return Tokens.OVER;
        // 解析后续tokens 获取相应的值
        const value = parseTokenValue.get(config, tokens);
        if (value === Tokens.OVER) return Tokens.OVER;
        res[config.key] = value;
        return Tokens.COUNTINUE;
    })
    // console.log(res.url)
    // res.url || console.log(res)
    // if (res.title && res.title[0].includes('queryLuckDrawCount')) {
    //     console.log(mdTokens.slice(0, 10), res)
    // }
    return res;
}

module.exports = parseDoc