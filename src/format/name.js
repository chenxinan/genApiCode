const reservedKeywords = ["do", "if", "for", "let", "new", "try", "var", "case", "else", "with", "await", "break", "catch", "class", "const", "super", "throw", "while", "yield", "delete", "export", "import", "return", "switch", "default", "extends", "finally", "continue", "debugger", "function", "argumentsdelete", "typeof", "void"]

module.exports = function formatName(data) {
    // case
    // /activCenterApi/activInfo/queryActiv
    let name = data.url || ''
    if (name) {
        const nameReg = /(?<=\/)\w+/g;
        const matched = name.match(nameReg)
        const lastName = matched[matched.length - 1]
        if (reservedKeywords.includes(lastName)) {
            const secondName = matched[matched.length - 2];
            name = secondName + lastName.replace(/\w/, v => v.toLocaleUpperCase())
        } else {
            name = matched ? lastName : '';
        }
    } else {
        // console.log('formatName', data)
    }
    return name

}