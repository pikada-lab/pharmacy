import SupplierItem from "./SupplierItem";
import Consignment from "./Consignment";

export default class Product {
    id: number; 
    title: number;
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
    
    supplierItems: SupplierItem[];
    consignments: Consignment[];
}