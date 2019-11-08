"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryType_enum_1 = require("../enums/DeliveryType.enum");
const OrderStatusType_enum_1 = require("../enums/OrderStatusType.enum");
const AppEvent_interface_1 = require("../interfaces/AppEvent.interface");
const DeliveryStatusType_enum_1 = require("../enums/DeliveryStatusType.enum");
const OrderedProduct_1 = require("./OrderedProduct");
class OrderProduced {
    constructor(structure) {
        this.id = +structure.id;
        this.customer = structure.customer;
        this.pharmacy = structure.pharmacy;
        this.type = +structure.type;
        this.delivery = structure.delivery;
        this.payment = structure.payment;
        this.comment = structure.comment;
        this.events = structure.events;
        if (!Array.isArray(this.events)) {
            this.events = [];
        }
        this.products = [];
        structure.products.forEach(element => {
            this.products.push(new OrderedProduct_1.default(element));
        });
    }
    /// serialize model
    getModel() {
        const orderProductd = [];
        this.products.forEach((element) => {
            orderProductd.push(element.getModel());
        });
        return {
            id: this.id,
            products: orderProductd,
            customer: this.customer,
            pharmacy: this.pharmacy,
            type: this.type,
            delivery: this.delivery,
            payment: this.payment,
            comment: this.comment,
            events: this.events
        };
    }
    /// order
    checkCancelPossibility() {
        return this.getCurrentStatus() === OrderStatusType_enum_1.OrderStatusType.NEW;
    }
    getAmount() {
        return this.products.reduce((amount, product) => amount + product.getAmount(), this.getDeliveryPrice());
    }
    getDelivery() {
        return this.delivery;
    }
    getDeliveryPrice() {
        if (this.type === DeliveryType_enum_1.DeliveryType.DELIVERY) {
            return this.delivery.cost;
        }
        return 0;
    }
    getCustomer() {
        return this.customer;
    }
    getCurrentStatus() {
        const event = this.events.sort((a, b) => a.date <= b.date ? 1 : -1).find(event => event.entityType === AppEvent_interface_1.EnityType.ORDER_PRODUCED);
        if (!event) {
            return OrderStatusType_enum_1.OrderStatusType.NEW;
        }
        return +event.data;
    }
    getDeliveryStatus() {
        const event = this.events.sort((a, b) => a.date <= b.date ? 1 : -1).find(event => event.entityType === AppEvent_interface_1.EnityType.DELIVERY);
        if (!event) {
            return DeliveryStatusType_enum_1.DeliveryStatusType.PROCESSING;
        }
        return +event.data;
    }
    getId() {
        return this.id;
    }
    getProducts() {
        return this.products;
    }
    getOrderEvents() {
        return this.events.sort((a, b) => a.date >= b.date ? 1 : -1).filter(event => event.entityType === AppEvent_interface_1.EnityType.ORDER_PRODUCED || event.entityType === AppEvent_interface_1.EnityType.DELIVERY);
    }
    pushEvent(event) {
        switch (event.entityType) {
            /**   Событие заказа */
            case AppEvent_interface_1.EnityType.ORDER_PRODUCED:
                if (this.getId() != +event.entityID)
                    return;
                this.setOrderEvent(event);
                break;
            /**   Событие доставки */
            case AppEvent_interface_1.EnityType.DELIVERY:
                if (this.getDelivery() == undefined)
                    return;
                if (this.getDelivery().id != +event.entityID)
                    return;
                this.setOrderEvent(event);
                break;
            /**   Событие продукта заказа */
            case AppEvent_interface_1.EnityType.ORDERED_PRODUCT:
                if (this.getId() != +event.entityID)
                    return;
                if (this.getProducts().findIndex(prod => prod.getID() == event.entityID) !== -1) {
                    this.setOrderEvent(event);
                }
                break;
        }
    }
    setOrderEvent(event) {
        if (this.events.findIndex(el => el.id === event.id) >= 0)
            return;
        this.events.push(event);
    }
}
exports.default = OrderProduced;
//# sourceMappingURL=OrderProduced.js.map