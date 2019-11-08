import PharmacyDetails from "../class/PharmacyDetails";
import Order from "../interfaces/Order.interface";
import { DeliveryType } from "../enums/DeliveryType.enum";
import Delivery from "./Delivery";
import OrderEvent from "./OrderEvent";
import OrderUserContacts from "../class/OrderUserContacts";
import Payment from "./Payment";
import { OrderStatusType } from "../enums/OrderStatusType.enum";
import { EnityType, EventType } from "../interfaces/AppEvent.interface";
import { DeliveryStatusType } from "../enums/DeliveryStatusType.enum";
import SerializeModel from "../interfaces/SerializeModel.interface";
import OrderProduct from "../interfaces/OrderProduct.interface";
import OrderedProduct from "./OrderedProduct";
import { StructureType } from "../interfaces/StructureType.type";

export default class OrderProduced implements Order, SerializeModel {


  id: number;
  products: OrderProduct[];
  customer: OrderUserContacts;
  pharmacy: PharmacyDetails;
  type: DeliveryType;

  delivery?: Delivery;
  payment: Payment;
  comment: string;

  events: OrderEvent[];

  constructor(structure: StructureType) {
    this.id = +structure.id;
    this.customer = structure.customer as any;
    this.pharmacy = structure.pharmacy as any;
    this.type = +structure.type;
    this.delivery = structure.delivery as any;
    this.payment = structure.payment as any;
    this.comment = structure.comment as any;
    this.events = structure.events as any[];
    if (!Array.isArray(this.events)) {
      this.events = [];
    }
    this.products = [];
    (structure.products as any[]).forEach(element => {
      this.products.push(new OrderedProduct(element))
    });
  }

  /// serialize model
  getModel(): StructureType {
    const orderProductd: any[] = [];
    this.products.forEach((element: any) => {
      orderProductd.push((element as SerializeModel).getModel())
    })

    return {
      id: this.id,
      products: orderProductd,
      customer: this.customer as any,
      pharmacy: this.pharmacy as any,
      type: this.type,

      delivery: this.delivery as any,
      payment: this.payment as any,
      comment: this.comment as any,
      events: this.events as any[]
    }
  }

  /// order
  checkCancelPossibility(): boolean {
    return this.getCurrentStatus() === OrderStatusType.NEW;
  }

  getAmount(): number {
    return this.products.reduce((amount: number, product: OrderProduct) => amount + product.getAmount(), this.getDeliveryPrice());
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
  getCurrentStatus(): OrderStatusType {
    const event = this.events.sort((a, b) => a.date <= b.date ? 1 : -1).find(event => event.entityType === EnityType.ORDER_PRODUCED);
    if (!event) {
      return OrderStatusType.NEW;
    }

    return +event.data as OrderStatusType;
  }
  getDeliveryStatus(): DeliveryStatusType {
    const event = this.events.sort((a, b) => a.date <= b.date ? 1 : -1).find(event => event.entityType === EnityType.DELIVERY);
    if (!event) {
      return DeliveryStatusType.PROCESSING;
    }

    return +event.data as DeliveryStatusType;
  }
  getId(): number {
    return this.id;
  }
  getProducts(): OrderProduct[] {
    return this.products;
  }
  getOrderEvents(): OrderEvent[] {
    return this.events.sort((a, b) => a.date >= b.date ? 1 : -1).filter(event => event.entityType === EnityType.ORDER_PRODUCED || event.entityType === EnityType.DELIVERY);
  }

  pushEvent(event: OrderEvent): void {
    switch (event.entityType) {
      /**   Событие заказа */
      case EnityType.ORDER_PRODUCED:
        if (this.getId() != +event.entityID) return;

        this.setOrderEvent(event)
        break;

      /**   Событие доставки */
      case EnityType.DELIVERY:
        if (this.getDelivery() == undefined) return;
        if (this.getDelivery().id != +event.entityID) return;
        this.setOrderEvent(event)
        break;

      /**   Событие продукта заказа */
      case EnityType.ORDERED_PRODUCT:
        if (this.getId() != +event.entityID) return;
        if (this.getProducts().findIndex(prod => prod.getID() == event.entityID) !== -1) {
          this.setOrderEvent(event)
        }
        break
    }
  }
  private setOrderEvent(event: OrderEvent) {
    if( this.events.findIndex(el => el.id === event.id) >= 0) return;
    this.events.push(event);
  }
}