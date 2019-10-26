import ProductStock from "../interfaces/ProductStock.interface";
import Product from "../interfaces/Product.interface";

export default class ProductBase implements Product {

    id: number;
    title: string;
    image: string;
    description: string;

    /**
     * Жизнено важный товар
     */
    isGNVLS: boolean;

    /**
     * по рецепту
     */
    isPrescription: boolean;

    supplierProducts: ProductStock[];
    consignments: ProductStock[];

    getID(): number {
        return this.id;
    }
    getTitle(): string {
        return this.title;
    }
    getImage(): string {
        return this.title;
    }
    getDescription(): string {
        return this.description;
    }
    getGNVLS(): boolean {
        return this.isGNVLS;
    }
    getPrescription(): boolean {
        return this.isPrescription;
    }
    getSupplierProducts(): ProductStock[] {
        return this.supplierProducts;
    }
    getConsigments(): ProductStock[] {
        return this.consignments;
    }

    getProduct() {
        return {
            title: this.getTitle()

        }
    }
}