import Product from "../entities/Product"; 
import OrderUserDetails from "../class/OrderUserDetails";
import { OrderAdressDetail } from "../class/OrderAdressDetail";
import PharmacyDetails from "../class/PharmacyDetails";
import ProductItem from "./ProductItem.interface";
import OrderCartItem from "../entities/OrderCartItem";
import CartService from "../service/CartService.interface";

export default interface CartInterface {
  constructor(CartService: CartService): any;

  add(product: Product, item: ProductItem): boolean;
  remove(item: ProductItem): boolean;
  getItem(item: ProductItem): OrderCartItem;

  clear(): void;

  validCartOrder(): number;
  send(): boolean;

  getCountItems(): number;
  getSum(): number;

  setUserDetails(user: OrderUserDetails): void;
  setAdressDetails(adress: OrderAdressDetail): void;
  setPharmacyDetails(pharmacy: PharmacyDetails): void;
}
