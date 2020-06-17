// const map = {
//     string: true,
//     int: true,
//     date: true,
//     String: true,
//     boolean: true,
//     Double: true,
//     '1.内部采购    2.外部采购': true,
//     'base64字符串': true,
//     receiveEndTime: true,
//     '规则  每几天使用': true,
//     centerAppBrandPass: true,
//     '自定义入口1 卡券跳转的小程序的path': true,
//     promotionAppBrandPass: true,
//     MultipartFile: true,
//     '图片路径': true,
//     array: true,
//     '集合': true,
//     'string（32）': true,
//     'string（10）': true,
//     long: true,
//     'long（20）': true,
//     'string（1024）': true,
//     'string(1024)': true,
//     list: true,
//     'string（100）': true,
//     Integer: true,
//     'List<ActivPrize>': true,
//     'String数组': true,
//     'string（50）': true,
//     'string （32）': true,
//     'string（40）': true,
//     'string（255）': true,
//     'string（20）': true,
//     'string（500）': true,
//     'string （20）': true
// }

module.exports = function formatParam(data) {
    // data.param.forEach(({
    //     type
    // }) => {
    //     map[type] = true
    // })
    // console.log(map)
    return data.param
}