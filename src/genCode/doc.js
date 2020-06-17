// function genArray(param) {
//     return '';
// }

// function genObejct(param) {
//     let {
//         key,
//         des,
//         defualtValue,
//         isOptional,
//     } = param;
//     const propertys = ' * @property  {number} uid  用户UID\n';
//     return (
//         ` * @typedef   {Object} ${key}  ${des}\n` +
//         propertys +
//         ` *\n`
//     )
// }

function genParam(data) {
    const param = data.param;
    // const dataKey = data.dataKey;
    // const dataKey = `${data.name}${data.dataKey.replace(/\w/, s => s.toLocaleUpperCase())}`
    const head = ''
    // const head = ` * @param {Object} ${dataKey}\n`
    return param.reduce((acm, p) => {
        let {
            key,
            des,
            defualtValue,
            required,
            type = '*',
        } = p;
        if (Array.isArray(type)) {
            type = `(${type.join('|')})`
        }
        if (!required) {
            if (defualtValue) {
                key += `=${defualtValue}`
            }
            key = `[${key}]`
        }
        return acm += ` * @param {${type}} ${key}  ${des}\n`
    }, head)
}

function genTitle(data) {
    let title = data.title;
    const tmp = title => ` * ${title}\n`;
    if (Array.isArray(title)) {
        return title.reduce((acm, t) => {
            return acm += tmp(t)
        }, '')
    } else {
        return tmp(title);
    }
}

function genReturn(v = 'any') {
    return ` * @return  {Promise<Res<${v}>>}\n`;
}

module.exports = function genJSDoc(data) {
    return (
        `/**\n` +
        genTitle(data) +
        ` *\n` +
        genParam(data) +
        genReturn(data) +
        ` */\n`
    )
}