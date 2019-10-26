import { ProductStockType } from "../enums/ProductStockType.enum";
import Product from "../interfaces/Product.interface";
import { OrderProductStatusType } from "../enums/OrderProductStatusType.enum";
import OrderProduct from "../interfaces/OrderProduct.interface";

export default class OrderedProduct implements OrderProduct {

    id: number;
    productID: number;

    stockType: ProductStockType;
    consigmentID?: number;
    supplierProductID?: string;
    supplierPricelistID?: number;
    
    price: number;
    quantity: number;

    status: OrderProductStatusType;

    product: Product;

    setQuantity(quantity: number): number {
        return this.quantity = quantity;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getPrice(): number {
        return this.price;
    }
    getAmount(): number {
        return this.price * this.quantity;
    }
    getStatus(): OrderProductStatusType {
        return this.status;
    }
    getProduct(): Product {
        return this.product;
    }



}