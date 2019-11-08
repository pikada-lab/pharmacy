import ProductStock from "../interfaces/ProductStock.interface";
import { ProductStockType } from "../enums/ProductStockType.enum";
import { StructureType } from "../interfaces/StructureType.type";

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

    constructor(structure: StructureType) {
        this.id = structure.id as string;
        this.contragentId = +structure.contragentId;
        this.price = +structure.price;
        this.quantity = +structure.quantity;
        this.GDATE = structure.GDATE as string;
    }

    getModel(): StructureType {
        return {
          id: this.id,
          contragentId: this.contragentId,
          price: this.price,
          quantity: this.quantity,
          GDATE: this.getGDATE().toJSON(),
        }
    }

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