import { OrderItemType } from "./OrderItem";

export default class OrderCartItem { 
    title: string;
    image: string;
    productID: number;

    type: OrderItemType;
    
    consigmentID?: number;
    
    suppliersItemID?: string;
    contragentID?: number;
    
    price: number;
    quantity: number;
}