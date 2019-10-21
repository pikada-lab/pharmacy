import OrderCart from "../entities/OrderCart";
import CartInterface from "../interfaces/Cart.interface";
import CartService from "../service/CartService.interface";

export default class Cart implements CartInterface {
 
    order: OrderCart; 
    constructor(private service: CartService) {
        let lastOrder = this.service.load();
         this.order = (lastOrder) ? lastOrder : new OrderCart();
    } 
}
 