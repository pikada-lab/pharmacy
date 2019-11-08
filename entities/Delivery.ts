import { Adress } from "../class/Adress";

export default class Delivery {
    id?: number;
    orderId?: number;
    adress: Adress;
    plannedDate: Date;
    cost: number;
    comment: string;
    curier: string;

}