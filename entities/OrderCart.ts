 
import { OrderType } from "./Order";
import OrderUserDetails from "../class/OrderUserDetails";
import { OrderAdressDetail } from "../class/OrderAdressDetail";
import OrderCartItem from "./OrderCartItem";
import PharmacyDetails from "../class/PharmacyDetails";

export default class OrderCart {

    items: OrderCartItem[];
    pharmacy: PharmacyDetails;
    type: OrderType;
    user: OrderUserDetails;
    adress?: OrderAdressDetail;
    comment: string;
}