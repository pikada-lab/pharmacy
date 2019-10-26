import ProductStock from "../interfaces/ProductStock.interface";
import { ProductStockType } from "../enums/ProductStockType.enum";

/**
 * Поставка со склада аптеки
 */
export default class ProductConsignment implements ProductStock {

    id: number;
    /**
     * Штрихкод EAN 13 по системе М-Аптека
     */
    pid: number;
    scu: number;
    quantity: number;
    price: number;
    GDATE: string;


    getType(): ProductStockType {
        return ProductStockType.LOCAL;
    }
    getConsignmentID(): number {
        return this.pid;
    }
    getSupplierPricelistID(): number {
        return null;
    }
    getSupplierProductID(): string {
        return null;
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