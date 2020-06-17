const fs = require('fs');
const path = require('path');
const {
    isTS,
    genMock,
    outputDir,
    baseApi,
    doc,
    content
} = require('../../genApi.config.js')

module.exports = function genFile(fileName) {
    const ext = isTS ? 'ts' : 'js'
    const folderDir = path.join(outputDir, fileName);
    const filePath = path.join(folderDir, 'index.' + ext);
    if (fs.existsSync(filePath)) {
        // 移除已有文件
        fs.unlinkSync(filePath)
    }
    // 创建文件夹
    const paths = folderDir.split('/');
    let prePath = '';
    for (let p of paths) {
        prePath = path.join(prePath, p);
        if (!fs.existsSync(prePath)) {
            fs.mkdirSync(prePath);
        }
    }
    return filePath;
}

// async function rmdirAsync(filePath) {
//     let stat = await fsp.stat(filePath)
//     if (stat.isFile()) {
//         await fsp.unlink(filePath)
//     } else {
//         let dirs = await fsp.readdir(filePath)
//         dirs = dirs.map(dir => rmdirAsync(path.join(filePath, dir)))
//         await Promise.all(dirs)
//         await fsp.rmdir(filePath)
//     }
// }