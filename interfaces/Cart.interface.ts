
import PharmacyDetails from "../class/PharmacyDetails";
import ProductStock from "./ProductStock.interface";
import CartService from "../services/CartService.interface";
import Product from "./Product.interface";
import CartProduct from "./CartProduct.interface";
import OrderUserContacts from "../class/OrderUserContacts";
import { Adress } from "../class/Adress";
import ProductDecided from "./ProductDecided.interface";
import Delivery from "../entities/Delivery";
import SerializeModel from "./SerializeModel.interface";
import { DeliveryType } from "../enums/DeliveryType.enum";

export default interface Cart extends SerializeModel {
 
  add(product: Product, item: ProductStock, quantity: number): boolean;
  remove(item: CartProduct): boolean;
  findByProduct(item: Product): CartProduct[];

  getProducts(): CartProduct[];
  actualizeCartProducts(products: Product[]): void;

  clear(): void;

  valid(): boolean; 

  getCountItems(): number;
  getAmount(): number;

  getDeliveryPrice(): number;
  getDelivery(): Delivery;
  setDeliveryType(type: DeliveryType): void;
  setUserContacts(user: OrderUserContacts): boolean;
  setDelivery(delivery: Delivery): void;
  changePharmacyDetails(pharmacy: PharmacyDetails): ProductDecided[];
  changePharmacyApply(pharmacy: PharmacyDetails, producStockDecided: ProductDecided[]): boolean;
}
