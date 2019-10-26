import ProductSelected from "./CartProduct.interface";
import Delivery from "../entities/Delivery";
import OrderUserContacts from "../class/OrderUserContacts";
import { OrderStatusType } from "../enums/OrderStatusType.enum";
import OrderEvent from "../entities/OrderEvent";

export default interface Order {
    checkCancelPossibility(): boolean;
    cancel(): boolean;

    getAmount(): number;
    getDelivery(): Delivery;

    getCustomer(): OrderUserContacts;
    getCurrentStatus(): OrderStatusType;

    getId():number;
    getProducts(): ProductSelected[];

    getOrderEvents(): OrderEvent[];

}
