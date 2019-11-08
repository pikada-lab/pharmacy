import Delivery from "../entities/Delivery";
import OrderUserContacts from "../class/OrderUserContacts";
import { OrderStatusType } from "../enums/OrderStatusType.enum";
import OrderEvent from "../entities/OrderEvent";
import OrderProduct from "./OrderProduct.interface";

export default interface Order { 
    checkCancelPossibility(): boolean; 

    getAmount(): number;
    getDelivery(): Delivery;

    getCustomer(): OrderUserContacts;
    getCurrentStatus(): OrderStatusType;

    getId():number;
    getProducts(): OrderProduct[];

    getOrderEvents(): OrderEvent[];

    pushEvent(status: OrderEvent): void;

}
