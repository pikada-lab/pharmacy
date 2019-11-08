"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuxHttpClient_interface_1 = require("../interfaces/AuxHttpClient.interface");
const SettingService_interface_1 = require("./SettingService.interface");
const ProductBase_1 = require("../entities/ProductBase");
const Products_service_1 = require("./Products.service");
class PharmacysService extends Products_service_1.default {
    constructor(http) {
        super(http);
        this.http = http;
        this.items = 8;
    }
    smartHints(part) {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/products/hints/${part}`).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
                const hints = [];
                response.response.forEach((element) => {
                    hints.push(element);
                });
                response.response = hints;
            }
            return response;
        }));
    }
    smartSearch(text, page) {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/products/search/${text}&page=${page}&items=${this.items}`).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
                const products = [];
                response.response.forEach((element) => {
                    products.push(new ProductBase_1.default(element));
                });
                response.response = products;
            }
            return response;
        }));
    }
    setCountProductOnPage(count) {
        this.items = count;
    }
}
exports.default = PharmacysService;
//# sourceMappingURL=Pharmacys.service.js.map