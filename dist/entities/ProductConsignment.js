"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductStockType_enum_1 = require("../enums/ProductStockType.enum");
/**
 * Поставка со склада аптеки
 */
class ProductConsignment {
    constructor(structure) {
        this.id = +structure.id;
        this.pid = +structure.pid;
        this.scu = +structure.scu;
        this.quantity = +structure.quantity;
        this.price = +structure.price;
        this.GDATE = structure.GDATE;
    }
    getModel() {
        return {
            id: this.id,
            pid: this.pid,
            scu: this.scu,
            quantity: this.quantity,
            price: this.price,
            GDATE: this.getGDATE().toJSON(),
        };
    }
    getType() {
        return ProductStockType_enum_1.ProductStockType.LOCAL;
    }
    getConsignmentID() {
        return this.pid;
    }
    getSupplierPricelistID() {
        return null;
    }
    getSupplierProductID() {
        return null;
    }
    getPrice() {
        return Math.round(100 * +this.price);
    }
    getGDATE() {
        return new Date(this.GDATE);
    }
    getQuantityMax() {
        return this.quantity;
    }
}
exports.default = ProductConsignment;
//# sourceMappingURL=ProductConsignment.js.map