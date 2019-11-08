import ProductStock from "../interfaces/ProductStock.interface";
import Product from "../interfaces/Product.interface";
import SerializeModel from "../interfaces/SerializeModel.interface";
import ProductConsignment from "./ProductConsignment";
import ProductSupplierItem from "./ProductSupplierItem";
import { StructureType } from "../interfaces/StructureType.type";

export default class ProductBase implements Product, SerializeModel {

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

    constructor(structure: StructureType) {
        this.id = +structure.id;
        this.title = structure.title as any;
        this.image = structure.image as any;
        this.description = structure.description as any;
        this.isGNVLS = structure.isGNVLS as any;
        this.isPrescription = structure.isPrescription as any;
        this.supplierProducts = [];
        if(typeof structure.supplierProducts != undefined && Array.isArray(structure.supplierProducts)) {
            (structure.supplierProducts as any[]).forEach(element => {
                this.supplierProducts.push(new ProductSupplierItem(element) )
            });
        }
        this.consignments = [];
        if(typeof structure.consignments != undefined && Array.isArray(structure.consignments)) {
            (structure.consignments as any[]).forEach(element => {
                this.consignments.push(new ProductConsignment(element) )
            }); 
        }

    }

    getModel(): StructureType {
        const supplierProducts : any[] = [];
        const consignments : any[] = [];
        this.supplierProducts.forEach((element: any) => {
            supplierProducts.push((element as SerializeModel).getModel())  
        })
        this.consignments.forEach((element: any) => {
            consignments.push((element as SerializeModel).getModel())  
        })
        return {
          id: this.id,
          title: this.title,
          image: this.image,
          description: this.description,
          isGNVLS: this.isGNVLS,
          isPrescription: this.isPrescription
        }
    }
 

    getID(): number {
        return this.id;
    }
    getTitle(): string {
        return this.title;
    }
    getImage(): string {
        return this.image;
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