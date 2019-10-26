import { OrderProductStatusType } from "../enums/OrderProductStatusType.enum";
import Product from "./Product.interface";

export default interface OrderProduct {
    setQuantity(quantity: number): number;
    getQuantity(): number;
    getPrice(): number;
    getAmount(): number;
    getStatus(): OrderProductStatusType;
    getProduct(): Product;
}