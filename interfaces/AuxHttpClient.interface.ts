import ProductBase from "../entities/ProductBase";

export default interface AuxHttpClient {
    get<T>(url: string): AuxHttpResponse<T>;
    post<T>(url: string, body: string): AuxHttpResponse<T>;
    put<T>(url: string, body: string): AuxHttpResponse<T>;
    delete<T>(url: string): AuxHttpResponse<T>;
}

export interface AuxHttpResponse<T> {
    subscribe(callback: (data: ResponseApi<T>) => void): void;
    pipe(...mapFunction: ((data: any) => any)[]): AuxHttpResponse<any>;
}
export function map(callback: (data: any) => any): any {
    return {
        name: "map",
        apply: (res: any): any => {
            if (Array.isArray(res)) {
                for (let i in res) {
                    res[i] = callback(res[i])
                }
            } else {
                res = callback(res);
            }
            return res;
        }
    };
}

export function switchMap(callback: (data: any) => AuxHttpResponse<any>): any {
    return {
        name: "switchMap",
        apply: (res: any): any => {
            return callback(res);
        }
    };
}
class emptyClass implements AuxHttpResponse<void> {
    subscribe(callback: (data: ResponseApi<void>) => void): void {

    }
    pipe(...mapFunction: ((data: any) => any)[]): AuxHttpResponse<any> {
        return this as AuxHttpResponse<any>;
    }
}
export function empty() {
    return new emptyClass();
}
export interface ResponseApi<T> {
    status: number;
    request: any;
    response: T;
    message: string;
}
let i = 0
export class AuxHttpClientTest implements AuxHttpClient {
    get<T>(url: string): AuxHttpResponse<T> {
        console.log(url);
        let httpData = this.getResponceByURL<T>(url);
        let resObj = {
            subscribe: (callback: (data: ResponseApi<T>) => void) => {

                setTimeout(() => {
                    callback(httpData);
                }, 25)
            },
            pipe: (...mapFunction: ((data: any) => any)[]): AuxHttpResponse<any> => {

                mapFunction.forEach(clbk => {
                    if (clbk.name == "map") { 
                        httpData = clbk.apply(httpData);
                    }
                    if (clbk.name == "switchMap") { 
                        resObj = clbk.apply(httpData);
                    }
                })
                return resObj as AuxHttpResponse<any>;
            }
        }
        return resObj;
    }
    post<T>(url: string, body: string): AuxHttpResponse<T> {
        let httpData = this.getPostResponceByURL<T>(url, body);
        let resObj = {
            subscribe: (callback: (data: ResponseApi<T>) => void) => {
                setTimeout(() => {
                    callback(httpData);
                }, 25)
            },
            pipe: (...mapFunction: ((data: any) => any)[]): AuxHttpResponse<any> => {
                mapFunction.forEach(clbk => {
                    if (clbk.name == "map") { 
                        httpData = clbk.apply(httpData);
                    }
                    if (clbk.name == "switchMap") { 
                        resObj = clbk.apply(httpData);
                    }
                })
                return resObj as AuxHttpResponse<any>;
            }
        }
        return resObj;
    }
    put<T>(url: string, body: string): AuxHttpResponse<T> {
        throw new Error("Method not implemented.");
    }
    delete<T>(url: string): AuxHttpResponse<T> {
        throw new Error("Method not implemented.");
    }

    private getPostResponceByURL<T>(url: string, data: string): ResponseApi<T> {
        switch (url) {
            case 'https://allo-apteka.ru/api/v1/settings/authorization':
                return {
                    status: 0,
                    response: { access: "JWT.TOKEN.IS" } as any,
                    request: [],
                    message: ''
                }

        }
    }
    private getResponceByURL<T>(url: string): ResponseApi<T> {
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
                    } as any,
                    request: [],
                    message: ''
                }
            case 'https://allo-apteka.ru/api/v1/products/2':
                return {
                    status: 4,
                    response: null,
                    request: [],
                    message: 'Нет продукта'
                }
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
                    ] as any,
                    request: [],
                    message: ''
                }

            case 'https://allo-apteka.ru/api/v1/products/4,5?arrayId':
                return {
                    status: 4,
                    response: null,
                    request: [],
                    message: 'Bad request'
                }
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
                    } as any,
                    request: [],
                    message: ''
                }

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
                    ]) as any,
                    request: [],
                    message: ''
                }

        }
    }

}