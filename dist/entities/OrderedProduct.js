"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductStockType_enum_1 = require("../enums/ProductStockType.enum");
class OrderedProduct {
    constructor(structure) {
        this.id = +structure.id;
        this.productID = +structure.productID;
        this.title = structure.title;
        this.image = structure.image;
        this.isPrescription = structure.isPrescription;
        this.stockType = structure.stockType;
        if (this.stockType == ProductStockType_enum_1.ProductStockType.LOCAL) {
            this.consigmentID = +structure.consigmentID;
        }
        if (this.stockType == ProductStockType_enum_1.ProductStockType.SUPPLIER) {
            this.supplierProductID = structure.supplierProductID;
            this.supplierPricelistID = +structure.supplierPricelistID;
        }
        this.price = +structure.price;
        this.quantity = +structure.quantity;
        this.status = structure.status;
    }
    getModel() {
        return {
            id: this.id,
            productID: this.productID,
            title: this.title,
            image: this.image,
            isPrescription: this.isPrescription,
            stockType: this.stockType,
            consigmentID: this.consigmentID,
            supplierProductID: this.supplierProductID,
            supplierPricelistID: this.supplierPricelistID,
            price: this.price,
            quantity: this.quantity,
            status: this.status,
        };
    }
    getID() {
        return this.id;
    }
    setQuantity(quantity) {
        return this.quantity = quantity;
    }
    getQuantity() {
        return this.quantity;
    }
    getPrice() {
        return Math.round(this.price * 100);
    }
    getAmount() {
        return this.getPrice() * this.quantity;
    }
    getStatus() {
        return this.status;
    }
}
exports.default = OrderedProduct;
//# sourceMappingURL=OrderedProduct.js.map