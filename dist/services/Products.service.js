"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuxHttpClient_interface_1 = require("../interfaces/AuxHttpClient.interface");
const SettingService_interface_1 = require("./SettingService.interface");
const ProductBase_1 = require("../entities/ProductBase");
class ProductsService {
    constructor(http) {
        this.http = http;
    }
    getProductByID(id) {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/products/${id}`).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
                response.response = new ProductBase_1.default(response.response);
            }
            return response;
        }));
    }
    getProductsByID(id) {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/products/${id.join(',')}?arrayId`).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
                if (Array.isArray(response.response)) {
                    const redis = [];
                    for (let i of response.response)
                        redis.push(new ProductBase_1.default(i));
                    response.response = redis;
                }
            }
            return response;
        }));
    }
}
exports.default = ProductsService;
//# sourceMappingURL=Products.service.js.map