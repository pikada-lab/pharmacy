import Cart from "../interfaces/Cart.interface";
import ProductService from "./ProductService.interface";
import { Adress } from "../class/Adress";
import Delivery from "../entities/Delivery";
import Product from "../interfaces/Product.interface";
import ProductStock from "../interfaces/ProductStock.interface";
import CartProduct from "../interfaces/CartProduct.interface";
import OrderUserContacts from "../class/OrderUserContacts";
import PharmacyDetails from "../class/PharmacyDetails";
import ProductDecided from "../interfaces/ProductDecided.interface";
import { ResponseApi } from "../interfaces/AuxHttpClient.interface";

export default interface CartService extends ProductService {

    /**
     * Сохраняет заказ где-то.
     * @param order Заказ
     */
    save(): ServiceRespone<boolean>; 
    getReadyDate(): ServiceRespone<ResponseApi<Date>>
    getDelivery(): ServiceRespone<Delivery>;
    setAdress(adress: Adress): ServiceRespone<ResponseApi<Delivery>>;

    add(product: Product, item: ProductStock, quantity: number): boolean;
    remove(item: CartProduct): boolean;
    findByProduct(item: Product): CartProduct[]; 
    getProducts(): CartProduct[];
  
    clear(): void;
  
    /**
     * Возвращает сообщение об ошибке если не валид
     */
    valid(): ServiceRespone<string>;
    send(): ServiceRespone<number>;
  
    getCountItems(): number;
    getAmount(): number;
    
    setUserContacts(user: OrderUserContacts): boolean;
    changePharmacyDetails(pharmacy: PharmacyDetails):  ServiceRespone<ProductDecided[]>;
    changePharmacyApply(pharmacy: PharmacyDetails, producStockDecided: ProductDecided[]): boolean;
}
