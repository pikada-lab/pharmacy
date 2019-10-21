import { OrderItemType } from "../entities/OrderItem";

export default interface ProductItem {
    
    getType() : OrderItemType;
    getID(): number;
    getContragentID(): number;
    getSupplierID(): number;
    getPrice() : number;
    

}