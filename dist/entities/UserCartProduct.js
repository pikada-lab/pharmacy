"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductStockType_enum_1 = require("../enums/ProductStockType.enum");
const OrderProductStatusType_enum_1 = require("../enums/OrderProductStatusType.enum");
class UserCartProduct {
    constructor(product, productStock, quantity) {
        this.product = product;
        this.productStock = productStock;
        this.quantity = (quantity >= productStock.getQuantityMax()) ? productStock.getQuantityMax() : quantity;
    }
    setQuantity(quantity) {
        if (quantity == 0)
            quantity = 1;
        return this.quantity = (quantity >= this.productStock.getQuantityMax()) ? this.productStock.getQuantityMax() : quantity;
    }
    getQuantity() {
        return this.quantity;
    }
    getAmount() {
        return Math.round(this.productStock.getPrice() * this.quantity);
    }
    getProduct() {
        return this.product;
    }
    getProductStock() {
        return this.productStock;
    }
    getStatus() {
        return OrderProductStatusType_enum_1.OrderProductStatusType.NEW;
    }
    getModel() {
        return {
            id: null,
            title: this.product.getTitle(),
            image: this.product.getImage(),
            productID: this.product.getID(),
            type: this.productStock.getType(),
            consigmentID: (this.productStock.getType() === ProductStockType_enum_1.ProductStockType.LOCAL) ? this.productStock.getConsignmentID() : null,
            supplierProductID: (this.productStock.getType() === ProductStockType_enum_1.ProductStockType.SUPPLIER) ? this.productStock.getSupplierProductID() : null,
            supplierPricelistID: (this.productStock.getType() === ProductStockType_enum_1.ProductStockType.SUPPLIER) ? this.productStock.getSupplierPricelistID() : null,
            price: this.productStock.getPrice(),
            quantity: this.quantity
        };
    }
}
exports.default = UserCartProduct;
//# sourceMappingURL=UserCartProduct.js.map