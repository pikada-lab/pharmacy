import PharmacyDetails from "../class/PharmacyDetails";
import Order from "../interfaces/Order.interface";
import { DeliveryType } from "../enums/DeliveryType.enum";
import Delivery from "./Delivery";
import OrderEvent from "./OrderEvent";
import OrderUserContacts from "../class/OrderUserContacts";
import Payment from "./Payment";
import ProductSelected from "../interfaces/CartProduct.interface";
import { OrderStatusType } from "../enums/OrderStatusType.enum";
import { EnityType } from "../interfaces/AppEvent.interface";
import { DeliveryStatusType } from "../enums/DeliveryStatusType.enum";

export default class OrderProduced implements Order {

  id: number;
  products: ProductSelected[];
  customer: OrderUserContacts;
  pharmacy: PharmacyDetails;
  type: DeliveryType;
  
  delivery?: Delivery;
  payment: Payment;
  comment: string;

  events: OrderEvent[];

  checkCancelPossibility(): boolean {
    return this.getOrderStatus() === OrderStatusType.NEW;
  }
  cancel(): boolean {
    //TODO
  }
  getAmount(): number {
    return this.products.reduce( (amount:number, product: ProductSelected) => amount + product.getAmount(), this.getOrderStatus());
  }
  getDelivery(): Delivery {
    return this.delivery;
  }
  getDeliveryPrice(): number {
    if (this.type === DeliveryType.DELIVERY) {
      return this.delivery.cost;
    }
    return 0;
  }
  getCustomer(): OrderUserContacts {
    return this.customer;
  }
  getOrderStatus(): OrderStatusType {
    const event = this.events.sort((a, b) => a.date >= b.date ? 1 : -1).find(event => event.entityType === EnityType.ORDER_PRODUCED);
    if(!event) {
      return OrderStatusType.NEW;
    }

    return +event.data as OrderStatusType;
  }
  getDeliveryStatus(): DeliveryStatusType {
    const event = this.events.sort((a, b) => a.date >= b.date ? 1 : -1).find(event => event.entityType === EnityType.DELIVERY);
    if(!event) {
      return DeliveryStatusType.PROCESSING;
    }

    return +event.data as DeliveryStatusType;
  }
  getId(): number {
    return this.id;
  }
  getProducts(): ProductSelected[] {
    return this.products;
  }
  getOrderEvents(): OrderEvent[] {
    return this.events.sort((a, b) => a.date >= b.date ? 1 : -1).filter(event => event.entityType === EnityType.ORDER_PRODUCED || event.entityType === EnityType.DELIVERY);
  }
}