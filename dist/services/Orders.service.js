"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuxHttpClient_interface_1 = require("../interfaces/AuxHttpClient.interface");
const Products_service_1 = require("./Products.service");
const SettingService_interface_1 = require("./SettingService.interface");
const OrderProduced_1 = require("../entities/OrderProduced");
class OrdersService extends Products_service_1.default {
    constructor(http) {
        super(http);
    }
    getList() {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/orders`).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
                const orders = [];
                response.response.forEach((element) => {
                    orders.push((element)); // TODO определить класс элемента в списке заказов
                });
                response.response = orders;
            }
            return response;
        }));
    }
    getByID(id) {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/orders/${id}`).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
                response.response = new OrderProduced_1.default(response.response);
            }
            return response;
        }));
    }
    cancel(id) {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/orders/${id}/cancel`);
    }
}
exports.default = OrdersService;
//# sourceMappingURL=Orders.service.js.map