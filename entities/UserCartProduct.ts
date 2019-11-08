import { ProductStockType } from "../enums/ProductStockType.enum";
import Product from "../interfaces/Product.interface";
import ProductStock from "../interfaces/ProductStock.interface";
import { OrderProductStatusType } from "../enums/OrderProductStatusType.enum";
import SerializeModel from "../interfaces/SerializeModel.interface";
import CartProduct from "../interfaces/CartProduct.interface";

export default class UserCartProduct implements CartProduct, SerializeModel {

    product: Product;
    productStock: ProductStock;
    quantity: number;

    constructor(product: Product, productStock: ProductStock, quantity: number) { 
        this.product = product;
        this.productStock = productStock;
        this.quantity = (quantity >= productStock.getQuantityMax()) ? productStock.getQuantityMax() : quantity;
    }

    setQuantity(quantity: number): number {
        if(quantity == 0) quantity = 1;
        return this.quantity = (quantity >= this.productStock.getQuantityMax()) ? this.productStock.getQuantityMax() : quantity;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getAmount(): number {
        return Math.round(this.productStock.getPrice() * this.quantity);
    }
    getProduct(): Product {
        return this.product;
    }
    getProductStock(): ProductStock {
        return this.productStock;
    }
    getStatus(): OrderProductStatusType {
        return OrderProductStatusType.NEW;
    }

    getModel(): any {
        return {
            id: null,
            title: this.product.getTitle(),
            image: this.product.getImage(),
            productID: this.product.getID(),
            type: this.productStock.getType(),

            consigmentID: (this.productStock.getType() === ProductStockType.LOCAL) ? this.productStock.getConsignmentID() : null,

            supplierProductID: (this.productStock.getType() === ProductStockType.SUPPLIER) ? this.productStock.getSupplierProductID() : null,
            supplierPricelistID: (this.productStock.getType() === ProductStockType.SUPPLIER) ? this.productStock.getSupplierPricelistID() : null,

            price: this.productStock.getPrice(),
            quantity: this.quantity
        }
    }

}