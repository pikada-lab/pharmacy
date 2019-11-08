"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuxHttpClient_interface_1 = require("../interfaces/AuxHttpClient.interface");
const UserCart_1 = require("../entities/UserCart");
const Products_service_1 = require("./Products.service");
const SettingService_interface_1 = require("./SettingService.interface");
const ProductBase_1 = require("../entities/ProductBase");
class CartsService extends Products_service_1.default {
    constructor(http, repository) {
        super(http);
        this.repository = repository;
        this.repository.getByID(0).then((cart) => {
            this.ready = false;
            const ids = cart.products.reduce((ids, addid) => ids.push(addid.id), []);
            this.cart = new UserCart_1.default(cart);
            this.getProductsByID(ids).subscribe((products) => {
                this.cart.actualizeCartProducts(products.response);
                this.ready = true;
            });
        }).catch(() => {
            this.cart = new UserCart_1.default();
            this.repository.create(this.cart.getModel()).then(_ => {
                this.ready = true;
            });
        });
    }
    send() {
        // TODO http
        return {
            subscribe: (callback) => {
                this.valid().subscribe((serverError) => {
                    if (serverError) {
                        return console.error('error: ', serverError);
                    }
                    this.http.post(`${SettingService_interface_1.URL_API}/v1/orders`, JSON.stringify(this.cart.getModel()))
                        .subscribe((res) => callback(res.response));
                });
            }
        };
    }
    save() {
        return {
            subscribe: (callback) => {
                this.ready = false;
                this.repository.update(this.cart.getModel(), 0).then(() => {
                    this.ready = true;
                    if (typeof callback != undefined) {
                        callback(true);
                    }
                }).catch(() => {
                    this.ready = true;
                    callback(false);
                });
            }
        };
    }
    getReadyDate() {
        return this.http.get(`${SettingService_interface_1.URL_API}/v1/orders/ready-date`).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
                response.response = new ProductBase_1.default(response.response);
            }
            return response;
        }));
    }
    getDelivery() {
        return {
            subscribe: (callback) => {
                if (typeof callback != undefined) {
                    callback(this.cart.getDelivery());
                }
            }
        };
    }
    setAdress(adress) {
        return this.http.post(`${SettingService_interface_1.URL_API}/v1/orders/adress`, JSON.stringify(adress)).pipe(AuxHttpClient_interface_1.map(response => {
            if (response.status === 0) {
                this.cart.setDelivery(response.response);
                response.response = response.response;
            }
            return response;
        }));
    }
    add(product, item, quantity) {
        if (this.cart.add(product, item, quantity)) {
            this.save().subscribe(() => { });
            return true;
        }
        return false;
    }
    remove(item) {
        if (this.cart.remove(item)) {
            this.save().subscribe(() => { });
            return true;
        }
        return false;
    }
    findByProduct(item) {
        return this.cart.findByProduct(item);
    }
    getProducts() {
        return this.cart.getProducts();
    }
    clear() {
        this.cart.clear();
        this.save().subscribe(() => { });
    }
    valid() {
        // TODO http
        return {
            subscribe: (callback) => {
                if (typeof callback != undefined) {
                    if (!this.cart.valid()) {
                        return callback('Корзина не валидна');
                    }
                    this.http.post(`${SettingService_interface_1.URL_API}/v1/orders/valid`, JSON.stringify(this.cart.getModel()))
                        .subscribe((res) => callback(res.message));
                }
            }
        };
    }
    getCountItems() {
        return this.cart.getCountItems();
    }
    getAmount() {
        return this.cart.getAmount();
    }
    setUserContacts(user) {
        this.save().subscribe(() => { });
        if (this.cart.setUserContacts(user)) {
            this.save().subscribe(() => { });
            return true;
        }
        return false;
    }
    changePharmacyDetails(pharmacy) {
        throw new Error("Method not implemented.");
    }
    changePharmacyApply(pharmacy, producStockDecided) {
        throw new Error("Method not implemented.");
    }
}
exports.CartsService = CartsService;
//# sourceMappingURL=Carts.service.js.map