export enum OrderItemType {
    INNER = 1,
    PREORDER
}

export default class OrderItem {
    
    id: number;
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