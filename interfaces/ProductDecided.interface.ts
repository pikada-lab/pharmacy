import ProductStock from "./ProductStock.interface";
import Product from "./Product.interface";

export default interface ProductDecided {
    productStock: ProductStock;
    changedProduct: Product;
    selectedProductStock: ProductStock;
    visible: boolean;
    decided: DecidedType;
    lock: boolean;
    quantity: number;
    
    getProduct(): Product;
    getDesided(): DecidedType;
    getSelectedProductStock() : ProductStock;
    getProductID(): number ;
    getQuantity() : number;
    setNewProduct(changedProduct?: Product): void;
}

export enum DecidedType {
    CHANGED = 1,
    DELETED
}

