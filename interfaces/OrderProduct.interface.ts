import { OrderProductStatusType } from "../enums/OrderProductStatusType.enum";
import Product from "./Product.interface";

export default interface OrderProduct {
    getID(): number;
    setQuantity(quantity: number): number;
    getQuantity(): number;
    getPrice(): number;
    getAmount(): number;
    getStatus(): OrderProductStatusType;
}