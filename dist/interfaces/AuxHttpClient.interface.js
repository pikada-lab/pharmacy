"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function map(callback) {
    return {
        name: "map",
        apply: (res) => {
            if (Array.isArray(res)) {
                for (let i in res) {
                    res[i] = callback(res[i]);
                }
            }
            else {
                res = callback(res);
            }
            return res;
        }
    };
}
exports.map = map;
function switchMap(callback) {
    return {
        name: "switchMap",
        apply: (res) => {
            return callback(res);
        }
    };
}
exports.switchMap = switchMap;
class emptyClass {
    subscribe(callback) {
    }
    pipe(...mapFunction) {
        return this;
    }
}
function empty() {
    return new emptyClass();
}
exports.empty = empty;
let i = 0;
class AuxHttpClientTest {
    get(url) {
        console.log(url);
        let httpData = this.getResponceByURL(url);
        let resObj = {
            subscribe: (callback) => {
                setTimeout(() => {
                    callback(httpData);
                }, 25);
            },
            pipe: (...mapFunction) => {
                mapFunction.forEach(clbk => {
                    if (clbk.name == "map") {
                        httpData = clbk.apply(httpData);
                    }
                    if (clbk.name == "switchMap") {
                        resObj = clbk.apply(httpData);
                    }
                });
                return resObj;
            }
        };
        return resObj;
    }
    post(url, body) {
        let httpData = this.getPostResponceByURL(url, body);
        let resObj = {
            subscribe: (callback) => {
                setTimeout(() => {
                    callback(httpData);
                }, 25);
            },
            pipe: (...mapFunction) => {
                mapFunction.forEach(clbk => {
                    if (clbk.name == "map") {
                        httpData = clbk.apply(httpData);
                    }
                    if (clbk.name == "switchMap") {
                        resObj = clbk.apply(httpData);
                    }
                });
                return resObj;
            }
        };
        return resObj;
    }
    put(url, body) {
        throw new Error("Method not implemented.");
    }
    delete(url) {
        throw new Error("Method not implemented.");
    }
    getPostResponceByURL(url, data) {
        switch (url) {
            case 'https://allo-apteka.ru/api/v1/settings/authorization':
                return {
                    status: 0,
                    response: { access: "JWT.TOKEN.IS" },
                    request: [],
                    message: ''
                };
        }
    }
    getResponceByURL(url) {
        switch (url) {
            case 'https://allo-apteka.ru/api/v1/products/1':
                return {
                    status: 0,
                    response: {
                        id: 1,
                        title: 'Tetarubuin',
                        image: 'product-154474.jpg',
                        description: 'Описание товара Тетарабуина',
                        isGNVLS: false,
                        isPrescription: true,
                        supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }],
                        consignments: [{ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' }]
                    },
                    request: [],
                    message: ''
                };
            case 'https://allo-apteka.ru/api/v1/products/2':
                return {
                    status: 4,
                    response: null,
                    request: [],
                    message: 'Нет продукта'
                };
            case 'https://allo-apteka.ru/api/v1/products/1,2,3?arrayId':
                return {
                    status: 0,
                    response: [
                        {
                            id: 1,
                            title: 'Tetarubuin',
                            image: 'product-154474.jpg',
                            description: 'Описание товара Тетарабуина',
                            isGNVLS: false,
                            isPrescription: true,
                            supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }],
                            consignments: [{ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' }]
                        },
                        {
                            id: 2,
                            title: 'Париет',
                            image: 'product-1544374.jpg',
                            description: 'Описание Париет',
                            isGNVLS: false,
                            isPrescription: true,
                            supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }],
                            consignments: [{ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' }]
                        },
                        {
                            id: 3,
                            title: 'Анальгин',
                            image: 'product-15-74.jpg',
                            description: 'Описание Анальгин',
                            isGNVLS: false,
                            isPrescription: true,
                            supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }],
                            consignments: [{ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' }]
                        }
                    ],
                    request: [],
                    message: ''
                };
            case 'https://allo-apteka.ru/api/v1/products/4,5?arrayId':
                return {
                    status: 4,
                    response: null,
                    request: [],
                    message: 'Bad request'
                };
            case 'https://allo-apteka.ru/api/v1/settings':
                return {
                    status: 0,
                    response: {
                        headerImage: "img1.jpg",
                        fullScreenImage: "img2.jpg",
                        userInteractionTimeot: 23,
                        pharmacy: {
                            id: 1,
                            name: "Аптека",
                            adress: "Москва",
                            phone: "+79099900990",
                            workingHours: "С утра",
                            longitude: 52.12412,
                            latitude: 24.23251,
                        }
                    },
                    request: [],
                    message: ''
                };
            case 'https://allo-apteka.ru/api/v1/settings/pharmacies':
                return {
                    status: 0,
                    response: ([{
                            id: 1,
                            name: "Аптека",
                            adress: "Москва",
                            phone: "+79099900990",
                            workingHours: "С утра",
                            longitude: 52.12412,
                            latitude: 24.23251,
                        }, {
                            id: 2,
                            name: "Аптека 2",
                            adress: "Москва 2",
                            phone: "+79099900991",
                            workingHours: "Круглосуточная",
                            longitude: 53.12412,
                            latitude: 21.23251,
                        },
                    ]),
                    request: [],
                    message: ''
                };
        }
    }
}
exports.AuxHttpClientTest = AuxHttpClientTest;
//# sourceMappingURL=AuxHttpClient.interface.js.map