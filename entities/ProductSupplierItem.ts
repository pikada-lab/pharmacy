import ProductStock from "../interfaces/ProductStock.interface";
import { ProductStockType } from "../enums/ProductStockType.enum";

export default class ProductSupplierItem implements ProductStock {
    /**
     * номер по прайс листу поставщика
     */
    id: string;
    /**
     * Номер прайс-листа контрагента (поставщика)
     */
    contragentId: number; 
    price: number;
    quantity: number;
    GDATE: string;

    getType(): ProductStockType {
        return ProductStockType.SUPPLIER;
    }
    getConsignmentID(): number {
        return null;
    }
    getSupplierPricelistID(): number {
        return this.contragentId;
    }
    getSupplierProductID(): string {
        return this.id;
    }
    getPrice(): number {
        return Math.round(100 * +this.price);
    }
    getGDATE(): Date {
        return new Date(this.GDATE);
    }
    getQuantityMax() {
        return this.quantity;
    }
}