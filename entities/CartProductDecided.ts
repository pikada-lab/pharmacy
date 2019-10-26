import ProductStock from "../interfaces/ProductStock.interface";
import Product from "../interfaces/Product.interface";
import { ProductStockType } from "../enums/ProductStockType.enum";
import ProductDecided, { DecidedType } from "../interfaces/ProductDecided.interface";

export class CartProductDecided implements ProductDecided {
    productStock: ProductStock;
    changedProduct: Product;
    selectedProductStock: ProductStock;
    visible = true;
    decided: DecidedType;
    lock = true;
    quantity = 1;
    constructor(changedProduct: Product, productStock: ProductStock, quantity: number) {
        this.changedProduct = changedProduct;
        this.productStock = productStock;
        this.quantity = quantity;
    }
    getProduct(): Product {
        return this.changedProduct;
    }
    getDesided(): DecidedType {
        return this.decided;
    }
    getSelectedProductStock(): ProductStock {
        return this.selectedProductStock;
    }
    getProductID(): number {
        return this.changedProduct.getID();
    }
    getQuantity(): number {
        return this.quantity;
    }
    setNewProduct(changedProduct?: Product): void {
        if (!changedProduct)
            return this.deleteProduct();
        this.changedProduct = changedProduct;
        const supplier = this.changedProduct.getSupplierProducts();
        const stock = this.changedProduct.getConsigments();
        if (this.productStock.getType() == ProductStockType.LOCAL) {
            if (stock.length > 0) {
                return this.selectLocalProduct(stock[0]);
            }
            else if (supplier.length > 0) {
                return this.changeSupplierProduct(stock[0]);
            }
        }
        else {
            if (stock.length > 0) {
                return this.changeLocalProduct(stock[0]);
            }
            else if (supplier.length > 0) {
                return this.selectSupplierProduct(stock[0]);
            }
        }
        return this.deleteProduct();
    }
    private selectLocalProduct(stock: ProductStock) {
        if (stock.getPrice() === this.productStock.getPrice()) {
            this.visible = false;
        }
        this.decided = DecidedType.CHANGED;
        this.selectedProductStock = stock;
        this.setValidQuantity(stock.getQuantityMax());
        this.lock = false;
    }
    private deleteProduct() {
        this.decided = DecidedType.DELETED;
        this.selectedProductStock = null;
        this.lock = true;
    }
    private changeSupplierProduct(stock: ProductStock) {
        this.decided = DecidedType.CHANGED;
        this.selectedProductStock = stock;
        this.setValidQuantity(stock.getQuantityMax());
        this.lock = false;
    }
    private selectSupplierProduct(stock: ProductStock) {
        if (stock.getPrice() === this.productStock.getPrice()) {
            this.visible = false;
        }
        this.decided = DecidedType.CHANGED;
        this.selectedProductStock = stock;
        this.setValidQuantity(stock.getQuantityMax());
        this.lock = false;
    }
    private changeLocalProduct(stock: ProductStock) {
        this.decided = DecidedType.CHANGED;
        this.selectedProductStock = stock;
        this.setValidQuantity(stock.getQuantityMax());
        this.lock = false;
    }
    private setValidQuantity(quantityNew: number) {
        if (this.quantity > quantityNew)
            this.quantity = quantityNew;
    }
}
