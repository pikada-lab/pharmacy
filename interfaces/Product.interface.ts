import ProductStock from "./ProductStock.interface";

export default interface Product {
    getID(): number;
    getTitle(): string;
    getImage(): string;
    getDescription(): string;
    getGNVLS(): boolean;
    getPrescription(): boolean;
    getSupplierProducts(): ProductStock[];
    getConsigments(): ProductStock[];
}