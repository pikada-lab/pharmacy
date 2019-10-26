import { ProductStockType } from "../enums/ProductStockType.enum";

export default interface ProductStock {
    
    getType() : ProductStockType;
    getConsignmentID(): number;
    getSupplierPricelistID(): number;
    getSupplierProductID(): string;
    getPrice(): number;
    getGDATE(): Date;
    getQuantityMax(): number;
}