import { ProductStockType } from "../enums/ProductStockType.enum";
import { OrderProductStatusType } from "../enums/OrderProductStatusType.enum";
import OrderProduct from "../interfaces/OrderProduct.interface";
import SerializeModel from "../interfaces/SerializeModel.interface";
import { StructureType } from "../interfaces/StructureType.type";


export default class OrderedProduct implements OrderProduct, SerializeModel {

    id: number;

    //  Продукт
    productID: number;
    title: string;
    image: string;
    isPrescription: boolean;

    // Конкретный продукт
    stockType: ProductStockType;
    consigmentID?: number;
    supplierProductID?: string;
    supplierPricelistID?: number;

    // Детали заказа
    price: number;
    quantity: number;

    status: OrderProductStatusType;

    constructor(structure: StructureType) {
        this.id = +structure.id;
        this.productID = +structure.productID;
        this.title = structure.title as string;
        this.image = structure.image as string;
        this.isPrescription = structure.isPrescription as boolean;
        this.stockType = structure.stockType as ProductStockType;
        if (this.stockType == ProductStockType.LOCAL) {
            this.consigmentID = +structure.consigmentID;
        }
        if (this.stockType == ProductStockType.SUPPLIER) {
            this.supplierProductID = structure.supplierProductID as string;
            this.supplierPricelistID = +structure.supplierPricelistID;
        }

        this.price = +structure.price;
        this.quantity = +structure.quantity;
        this.status = structure.status as OrderProductStatusType;
    }

    getModel(): StructureType {
        return {
            id: this.id,
            productID: this.productID,
            title: this.title,
            image: this.image,
            isPrescription: this.isPrescription,
            stockType: this.stockType,
            consigmentID: this.consigmentID,
            supplierProductID: this.supplierProductID,
            supplierPricelistID: this.supplierPricelistID,
            price: this.price,
            quantity: this.quantity,
            status: this.status,
        }
    }

    getID() :number {
        return this.id;
    }

    setQuantity(quantity: number): number {
        return this.quantity = quantity;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getPrice(): number {
        return Math.round(this.price * 100);
    }
    getAmount(): number {
        return this.getPrice() * this.quantity;
    }
    getStatus(): OrderProductStatusType {
        return this.status;
    }

}