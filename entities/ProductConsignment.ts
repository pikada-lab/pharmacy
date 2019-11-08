import ProductStock from "../interfaces/ProductStock.interface";
import { ProductStockType } from "../enums/ProductStockType.enum";
import { StructureType } from "../interfaces/StructureType.type";

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

    constructor(structure: StructureType) {
        
        this.id = +structure.id;
        this.pid = +structure.pid;
        this.scu = +structure.scu;
        this.quantity = +structure.quantity;
        this.price = +structure.price;
        this.GDATE = structure.GDATE as string;
    }

    getModel(): StructureType {
        return {
          id: this.id,
          pid: this.pid,
          scu: this.scu,
          quantity: this.quantity,
          price: this.price,
          GDATE: this.getGDATE().toJSON(),
        }
    }


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