const Tokens = require('./tokens');

const parseTokenKey = {
    get(config, tokens, matched) {
        return tokens.traverse((token) => {
            const content = token.content;
            let res = config.find((c => !matched[c.key] && content.includes(c.match)))
            if (res) {
                matched[res.key] = true
                // 2是跳过close token
                tokens.move(2);
                return res;
            }
            return Tokens.COUNTINUE;
        })
    }
}

module.exports = parseTokenKey;