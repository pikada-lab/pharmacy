export default class SupplierItem  {
    /**
     * номер по прайс листу поставщика
     */
    id: string;
    /**
     * Номер контрагента (поставщика)
     */
    contragentId: number; 
    price: number;
    quantity: number;
    GDATE: string;
}