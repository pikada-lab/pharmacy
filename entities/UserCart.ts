import PharmacyDetails from "../class/PharmacyDetails";
import OrderUserContacts from "../class/OrderUserContacts";
import { DeliveryType } from "../enums/DeliveryType.enum";
import Delivery from "./Delivery";
import Payment from "./Payment";
import CartProduct from "../interfaces/CartProduct.interface";
import Cart from "../interfaces/Cart.interface";
import UserCartProduct from "./UserCartProduct";
import Product from "../interfaces/Product.interface";
import ProductStock from "../interfaces/ProductStock.interface";
import { ProductStockType } from "../enums/ProductStockType.enum"; 
import { Adress } from "../class/Adress";
import { CartProductDecided } from "./CartProductDecided";
import ProductDecided, { DecidedType } from "../interfaces/ProductDecided.interface";

export default class UserCart implements Cart {
 

    products: CartProduct[];
    user: OrderUserContacts;
    pharmacy: PharmacyDetails;
    type: DeliveryType;

    delivery?: Delivery;
    payment: Payment;

    comment: string;


    add(product: Product, item: ProductStock, quantity: number): boolean {
        if (this.findByProduct(product).find((cartProduct: CartProduct) => {
            const stock = cartProduct.getProductStock();
            return (stock.getType() === ProductStockType.LOCAL && stock.getConsignmentID() === item.getConsignmentID()) ||
                (stock.getType() === ProductStockType.SUPPLIER && stock.getSupplierPricelistID() === item.getSupplierPricelistID() &&
                    stock.getSupplierProductID() === item.getSupplierProductID())
        })) return false;
        this.products.unshift(new UserCartProduct(product, item, quantity));
        return true;

    }
    remove(item: CartProduct): boolean {
        const index = this.products.findIndex(cartProduct => cartProduct === item);
        if (index === -1) return false;
        delete this.products[index]
        return true;
    }
    findByProduct(item: Product): CartProduct[] {
        return this.products.filter(product => product.getProduct().getID() === item.getID())
    }
    getProducts(): CartProduct[] {
        return this.products;
    }
    clear(): void {
        this.products = [];
    }
    valid(): boolean {
        // TODO: SERVICE WAIT
    }
    send(): boolean {
        // TODO: SERVICE WAIT
    }
    getCountItems(): number {
        return this.products.length;
    }
    getAmount(): number {
        return this.products.reduce((summary, productCart) => summary + productCart.getAmount(), this.getDeliveryPrice());
    }
    getDeliveryPrice(): number {
        if (this.type === DeliveryType.DELIVERY) {
            return this.delivery.cost;
        }
        return 0;
    }
    setUserContacts(user: OrderUserContacts): boolean {
        this.user = user;
        return true;
    }
    setAdress(adress: Adress): boolean {
        // TODO:  По адресу сделать запрос на создание Delivery и записать в Delivery
    }
    private setPharmacyDetails(pharmacy: PharmacyDetails): void {
        if (this.products.length != 0) throw new Error("Pharmacy can not by added");
        this.pharmacy = pharmacy;
    }
    changePharmacyDetails(pharmacy: PharmacyDetails): ProductDecided[] {
        if (this.pharmacy.id == pharmacy.id) return null;
        if (this.products.length === 0) {
            this.setPharmacyDetails(pharmacy);
            return null;
        }
        const desided: CartProductDecided[] = [];
        this.products.forEach(item => desided.push(new CartProductDecided(item.getProduct(), item.getProductStock(), item.getQuantity())));
        return desided;
    }

    changePharmacyApply(pharmacy: PharmacyDetails, producStockDecided: ProductDecided[]): boolean {
        this.products = [];
        producStockDecided.forEach(producStockDecided => {
            if (producStockDecided.getDesided() === DecidedType.CHANGED) {
                this.products.push(new UserCartProduct(producStockDecided.getProduct(), producStockDecided.getSelectedProductStock(), producStockDecided.getQuantity()));
            }
        })
        this.pharmacy = pharmacy;
        if(this.valid()) return true;
    }

}