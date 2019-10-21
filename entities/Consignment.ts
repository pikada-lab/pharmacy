export default class Consignment {
    id: number;
    /**
     * Штрихкод EAN 13 по системе М-Аптека
     */
    pid: number;
    scu: number;
    quantity: number;
    price: number;
    GDATE: string;
} 