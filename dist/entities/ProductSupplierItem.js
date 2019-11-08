"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductStockType_enum_1 = require("../enums/ProductStockType.enum");
class ProductSupplierItem {
    constructor(structure) {
        this.id = structure.id;
        this.contragentId = +structure.contragentId;
        this.price = +structure.price;
        this.quantity = +structure.quantity;
        this.GDATE = structure.GDATE;
    }
    getModel() {
        return {
            id: this.id,
            contragentId: this.contragentId,
            price: this.price,
            quantity: this.quantity,
            GDATE: this.getGDATE().toJSON(),
        };
    }
    getType() {
        return ProductStockType_enum_1.ProductStockType.SUPPLIER;
    }
    getConsignmentID() {
        return null;
    }
    getSupplierPricelistID() {
        return this.contragentId;
    }
    getSupplierProductID() {
        return this.id;
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
exports.default = ProductSupplierItem;
//# sourceMappingURL=ProductSupplierItem.js.map