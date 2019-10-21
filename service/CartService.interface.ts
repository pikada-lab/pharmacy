import OrderCart from "../entities/OrderCart"; 
import CartInterface from "../interfaces/Cart.interface";

export default interface CartService {
    /** Отправляет на оформление заказа то, что лежит в корзине  */
    send(order: OrderCart): boolean;
    /** 
     * Говорит, что что-то изменилось. 
     * @param order изменённый заказ
    */
    change(order: CartInterface): void;
    /** Загружает заказ при создании корзины, если он есть */
    load(): OrderCart;
    /**
     * Сохраняет заказ где-то.
     * @param order Заказ
     */
    save(order: OrderCart): void;
}
