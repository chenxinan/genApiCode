const axios = require('axios');
const {
    isTS,
    genMock,
    outputDir,
    baseApi,
    doc,
    content
} = require('../../genApi.config')


module.exports = function fetch({
    initFile,
    resolveApi
}) {
    return axios
        .post(doc.api.menu, {
            item_id: doc.id,
        })
        .then((res) => {
            return res.data.data.menu.catalogs.find(({
                cat_name
            }) => cat_name === doc.name);
        })
        .then(async ({
            catalogs
        }) => {
            for (let catalog of catalogs) {
                // opt 想想这段逻辑怎么抽离
                const apis = catalogs.reduce((acm, {
                    catalogs
                }) => {
                    catalogs.forEach((catalog2) => {
                        acm[catalog2.cat_id] = {
                            title: catalog2.cat_name,
                            len: catalog2.pages.length,
                            content: '',
                        };
                    })
                    return acm;
                }, {})
                const closure = initFile && initFile(catalog.cat_name, {
                    apis,
                    pageLen: catalog.catalogs.length
                });
                for (let catalog2 of catalog.catalogs) {
                    for (let page of catalog2.pages) {
                        axios
                            .post(doc.api.page, {
                                page_id: page.page_id,
                            })
                            .then((res) => {
                                resolveApi && resolveApi(closure, {
                                    id: page.cat_id,
                                    content: res.data.data.page_content
                                })
                            });
                    }
                }
            }
        }).catch(err => {
            console.error('请求错误', err)
        });
}