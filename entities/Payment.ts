import { PaymentType } from "../enums/PaymentType.enum";

export default class Payment {
    type: PaymentType;
    amount: number;
    /**
     * текущий буквенный код валюты в ISO 4217
     */
    currency: string;
    date: Date;
}