"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductStockType_enum_1 = require("../enums/ProductStockType.enum");
const ProductDecided_interface_1 = require("../interfaces/ProductDecided.interface");
class CartProductDecided {
    constructor(changedProduct, productStock, quantity) {
        /**
         * Если товар не изменился, то эти решения не следует показывать пользователю
         */
        this.visible = true;
        /**
         * Блокировка кнопки применения изменений, если истина, то возможно только удаление товара
         */
        this.lock = true;
        this.quantity = 1;
        this.changedProduct = changedProduct;
        this.productStock = productStock;
        this.quantity = quantity;
    }
    getProduct() {
        return this.changedProduct;
    }
    getDesided() {
        return this.decided;
    }
    getSelectedProductStock() {
        return this.selectedProductStock;
    }
    getProductID() {
        return this.changedProduct.getID();
    }
    getQuantity() {
        return this.quantity;
    }
    setNewProduct(changedProduct) {
        if (!changedProduct)
            return this.deleteProduct();
        this.changedProduct = changedProduct;
        const supplier = this.changedProduct.getSupplierProducts();
        const stock = this.changedProduct.getConsigments();
        if (this.productStock.getType() == ProductStockType_enum_1.ProductStockType.LOCAL) {
            if (stock.length > 0) {
                return this.selectLocalProduct(this.getBetterStockByPrice(stock));
            }
            else if (supplier.length > 0) {
                return this.changeSupplierProduct(this.getBetterStockByPrice(supplier));
            }
        }
        else {
            if (stock.length > 0) {
                return this.changeLocalProduct(this.getBetterStockByPrice(stock));
            }
            else if (supplier.length > 0) {
                return this.selectSupplierProduct(this.getBetterStockByPrice(supplier));
            }
        }
        return this.deleteProduct();
    }
    getBetterStockByPrice(ps) {
        return ps.sort((r, l) => r.getPrice() < l.getPrice() ? -1 : 1)[0];
    }
    selectLocalProduct(stock) {
        if (stock.getPrice() === this.productStock.getPrice()) {
            this.visible = false;
        }
        this.decided = ProductDecided_interface_1.DecidedType.CHANGED;
        this.selectedProductStock = stock;
        this.setValidQuantity(stock.getQuantityMax());
        this.lock = false;
    }
    deleteProduct() {
        this.decided = ProductDecided_interface_1.DecidedType.DELETED;
        this.selectedProductStock = null;
        this.lock = true;
    }
    changeSupplierProduct(stock) {
        this.decided = ProductDecided_interface_1.DecidedType.CHANGED;
        this.selectedProductStock = stock;
        this.setValidQuantity(stock.getQuantityMax());
        this.lock = false;
    }
    selectSupplierProduct(stock) {
        if (stock.getPrice() === this.productStock.getPrice()) {
            this.visible = false;
        }
        this.decided = ProductDecided_interface_1.DecidedType.CHANGED;
        this.selectedProductStock = stock;
        this.setValidQuantity(stock.getQuantityMax());
        this.lock = false;
    }
    changeLocalProduct(stock) {
        this.decided = ProductDecided_interface_1.DecidedType.CHANGED;
        this.selectedProductStock = stock;
        this.setValidQuantity(stock.getQuantityMax());
        this.lock = false;
    }
    setValidQuantity(quantityNew) {
        if (this.quantity > quantityNew)
            this.quantity = quantityNew;
    }
}
exports.default = CartProductDecided;
//# sourceMappingURL=CartProductDecided.js.map