import ProductStock from "../interfaces/ProductStock.interface";
import Product from "../interfaces/Product.interface";
import { ProductStockType } from "../enums/ProductStockType.enum";
import ProductDecided, { DecidedType } from "../interfaces/ProductDecided.interface";

export default class CartProductDecided implements ProductDecided {
    productStock: ProductStock;
    changedProduct: Product;
    selectedProductStock: ProductStock;
    /**
     * Если товар не изменился, то эти решения не следует показывать пользователю
     */
    visible = true;
    
    decided: DecidedType;
    /**
     * Блокировка кнопки применения изменений, если истина, то возможно только удаление товара
     */
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
    private getBetterStockByPrice(ps: ProductStock[]) {
        return ps.sort((r , l)=>   r.getPrice() < l.getPrice() ? -1 : 1)[0];
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
