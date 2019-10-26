import Product from "./Product.interface";
import ProductStock from "./ProductStock.interface";
import { OrderProductStatusType } from "../enums/OrderProductStatusType.enum";

export default interface CartProduct {  
    setQuantity(quantity: number) : number;
    getQuantity() : number;
    getAmount(): number;
    getProduct(): Product;
    getProductStock() : ProductStock;
    getStatus(): OrderProductStatusType;
}