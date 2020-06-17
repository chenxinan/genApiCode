module.exports = {
    isTS: false,
    genMock: false,
    outputDir: './result/test',
    baseApi: {
        dir: '@/util/request',
        var: 'request',
    },
    // todo
    doc: {},
    contents: [{
            key: 'title',
            match: '描述',
            type: 'Array'
        },
        {
            key: 'url',
            match: ['请求URL', '请求url'],
            type: 'String'
        },
        {
            key: 'method',
            match: '请求方式',
            type: 'String'
        },
        {
            key: 'param',
            match: '参数',
            type: 'Table',
            data: [{
                    key: 'key',
                    match: '参数',
                    type: 'String',
                },
                {
                    key: 'required',
                    match: '必选',
                    type: 'Boolean',
                },
                {
                    key: 'type',
                    match: '类型',
                    type: 'String',
                },
                {
                    key: 'des',
                    match: '说明',
                    type: 'String',
                }
            ]
        },
        {
            key: 'resTmp',
            match: '返回示例',
            type: 'Code'
        },
        {
            key: 'resDes',
            match: '返回参数',
            type: 'Table',
            data: [{
                    key: 'param',
                    match: '参数',
                    type: 'String',
                },
                {
                    key: 'required',
                    match: '必选',
                    type: 'Boolean',
                },
                {
                    key: 'type',
                    match: '类型',
                    type: 'String',
                },
                {
                    key: 'des',
                    match: '说明',
                    type: 'String',
                    required: false,
                }
            ]
        }
    ]
};