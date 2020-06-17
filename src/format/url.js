module.exports = function formatUrl(data) {
    // case
    // http://{url}:port/eventsProcessor/cardInfo/qryCard 
    // {url}:{port}/eventsCenterApi/cardDetail/myCodePkg
    // http://xx.com/api/user/register
    // http://xx.com:9188/eventsCenterApi/sms
    // {}/eventsCenterApi/giftPacks/queryGiftInfoById
    // {url}/activCenterApi/activInfo/joinLuckDraw
    // http://xx.com/activCenterApi/activInfo/queryActiv
    // ` http://xx.com/eventsCenterBack/activInfo/updateStatus/{id}/{status} `
    // ` http://{url}/activCenterApi/activInfo/queryLuckDrawCount`
    let url = data.url || ''
    if (url) {
        // const urlReg = /[`|\s]*(https?:?\/*)?(\w+\.\w+)?({\w*})?(:{?[\w|\d]*}?)?(?=\/[\w|\/|{|}]+)[`|\s]*/g
        const urlReg = /\/\w+(\/{?\w+}?)+/g;
        const match = url.match(urlReg)
        url = match[match.length - 1].replace(/{/g, '${' + data.dataKey + '.')
    } else {
        // console.log('formatUrl', data)
    }
    return url
}