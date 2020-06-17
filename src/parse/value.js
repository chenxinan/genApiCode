const Tokens = require('./tokens');

let tokens;

const parseTokenValue = {
    // opt 优化这段逻辑
    get(config, _tokens, openType, closeType) {
        tokens = _tokens;
        let searching = false
        return tokens.traverse((token) => {
            const type = config.type.toLocaleLowerCase();
            const tokenType = token.type;
            if (searching) {
                if (closeType === tokenType) return Tokens.BREAK;
            } else if (openType === tokenType || !openType) {
                searching = true
            } else {
                return Tokens.COUNTINUE;
            }
            const parseFn = this[`${tokenType}__${type}`];
            if (!parseFn) return Tokens.COUNTINUE;
            return parseFn.call(this, config, token);
        })
    },
    // opt 
    bullet_list_open__string(c) {
        return this._getString(c);
    },
    paragraph_open__string(c) {
        return this._getString(c);
    },
    td_open__string(c) {
        return this._getString(c);
    },
    paragraph_open__array() {
        return this._getArray('paragraph_close');
    },
    bullet_list_open__array() {
        return this._getArray('bullet_list_close');
    },
    fence__code(_, token) {
        let res = {};
        try {
            res = JSON.parse(token.content);
        } catch (error) {
            // console.log(error)
        }
        return res;
    },
    td_open__boolean(c) {
        const boolMap = {
            '是': true,
            '否': false,
        };
        let res = this._getString(c) || '否';
        // console.log(res)
        res = boolMap[res] || false;
        return res;
    },
    _getString(config) {
        return tokens.traverse((token, index) => {
            const content = token.content;
            const type = token.type;
            if (
                type === 'inline' &&
                config.required === false &&
                content === ''
            ) {
                // console.log(config, content, index, tokens.data[index]);
                return '无';
            }
            return content ? content : Tokens.COUNTINUE;
        })
    },
    _getArray(endTokenType) {
        const res = [];
        return tokens.traverse((token) => {
            const type = token.type;
            const content = token.content;
            if (type === endTokenType) {
                return res;
            } else if (content) {
                res.push(content);
            }
            return Tokens.COUNTINUE;
        })
    },
    table_open__table(config) {
        const tableConfigs = config.data;
        const res = [];
        const configs = [];
        const matchedMap = {};
        const headStrs = this._getArray('thead_close');
        let step = 0;
        // 找出与配置匹配的configs
        headStrs.forEach((str) => {
            const _config = tableConfigs.find((c) => !matchedMap[c.match] && str.includes(c.match))
            if (_config) {
                matchedMap[_config.match] = true;
                step = configs.push(_config);
            }
        });
        // 填充配置相应的value
        let i = 0;
        while (true) {
            const index = ~~(i / step);
            const config = configs[i % step];
            const getRes = this.get(config, tokens, undefined, 'table_close');
            if (
                (config.key === 'key' && !/\w+/.test(getRes)) ||
                getRes === undefined
            ) continue;
            if (getRes === Tokens.BREAK || getRes === Tokens.OVER) break;
            (res[index] || (res[index] = {}))[config.key] = getRes;
            i++;
        }
        return res;
    }
}

module.exports = parseTokenValue;