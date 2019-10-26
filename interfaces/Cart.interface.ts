
import PharmacyDetails from "../class/PharmacyDetails";
import ProductStock from "./ProductStock.interface";
import CartService from "../services/CartService.interface";
import Product from "./Product.interface";
import ProductSelected from "./CartProduct.interface";
import OrderUserContacts from "../class/OrderUserContacts";
import { Adress } from "../class/Adress";
import ProductDecided from "./ProductDecided.interface";

export default interface Cart {
 
  add(product: Product, item: ProductStock, quantity: number): boolean;
  remove(item: ProductSelected): boolean;
  findByProduct(item: Product): ProductSelected[];

  getProducts(): ProductSelected[];

  clear(): void;

  valid(): boolean;
  send(): boolean;

  getCountItems(): number;
  getAmount(): number;

  getDeliveryPrice(): number;

  setUserContacts(user: OrderUserContacts): boolean;
  setAdress(adress: Adress): boolean;
  setPharmacyDetails(pharmacy: PharmacyDetails): void;
  changePharmacyDetails(pharmacy: PharmacyDetails): ProductDecided[];
  changePharmacyApply(pharmacy: PharmacyDetails, producStockDecided: ProductDecided[]): boolean;
}
