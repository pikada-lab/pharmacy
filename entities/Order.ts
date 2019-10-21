import OrderItem from "./OrderItem";
import { OrderAdressDetail } from "../class/OrderAdressDetail";
import OrderUserDetails from "../class/OrderUserDetails";
import PharmacyDetails from "../class/PharmacyDetails";

export enum OrderType {
  PICKUP = 1,
  DELIVERY
}

export default class Order {
  id: string;
  items: OrderItem[];
  type: OrderType;
  pharmacy: PharmacyDetails;
  user: OrderUserDetails;
  adress?: OrderAdressDetail;
  comment: string;
}
