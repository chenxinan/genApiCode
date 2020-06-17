const fetchApi = require('./util/fetchApi')
const genFile = require('./util/genFile')
const genCode = require('./genCode')
const format = require('./format')
const parseDoc = require('./parse')
const fs = require('fs');

function mdToCode(md) {
    // 解析markdown
    const data = parseDoc(md);
    // 格式数据
    const formattedData = format(data);
    // 根据数据生成接口代码
    const code = genCode.api(formattedData);
    return code;
}

fetchApi({

    initFile(fileName, api) {
        const filePath = genFile(fileName);
        const ws = fs.createWriteStream(filePath);
        const code = genCode.file.import();
        ws.write(code);
        return {
            ws,
            filePath,
            apis: api.apis,
            pending: api.pageLen,
        };
    },

    resolveApi(closure, {
        id,
        content
    }) {
        const api = closure.apis[id];
        api.content += mdToCode(content);
        if (--api.len === 0) {
            closure.ws.write(genCode.file.title(api.title));
            closure.ws.write(api.content);
            closure.apis[id] = null;
            if (--closure.pending === 0) {
                closure.ws.close();
                console.log('生成完成', closure.filePath)
            }
        }
    },

});




// const path = require('path');
// const {
//     isTS,
//     genMock,
//     outputDir,
//     baseApi,
//     doc,
//     content
// } = require('./genApi.config.js')

// const [argv2, argv3, argv4] = process.argv.slice(2);
// if (!(argv2 && argv2.includes('id=')) && !(argv3 && argv3.includes('name='))) {
//     console.error('请输入参数（🌰：node index.jt id=69 name=前后端对接文档）');
//     process.exit(1);
// }

// const itemId = argv2.split('=')[1];
// const docName = argv3.split('=')[1];
// const apiDir = (argv4 && argv4.split('=')[1]) || './src/test';
// const showDocMenu = 'http://10.201.27.146/apidoc/showdoc/index.php?s=/api/item/info';
// const apiDoc = 'http://10.201.27.146/apidoc/showdoc/index.php?s=/api/page/info';