import PharmacyDetails from "../class/PharmacyDetails";
import OrderUserContacts from "../class/OrderUserContacts";
import { DeliveryType } from "../enums/DeliveryType.enum";
import Delivery from "./Delivery";
import Payment from "./Payment";
import CartProduct from "../interfaces/CartProduct.interface";
import Cart from "../interfaces/Cart.interface";
import UserCartProduct from "./UserCartProduct";
import Product from "../interfaces/Product.interface";
import ProductStock from "../interfaces/ProductStock.interface";
import { ProductStockType } from "../enums/ProductStockType.enum";
import CartProductDecided from "./CartProductDecided";
import ProductDecided, { DecidedType } from "../interfaces/ProductDecided.interface";
import SerializeModel from "../interfaces/SerializeModel.interface";
import ProductBase from "./ProductBase";
import { StructureType } from "../interfaces/StructureType.type";
import ProductConsignment from "./ProductConsignment";
import ProductSupplierItem from "./ProductSupplierItem";

export default class UserCart implements Cart {

    products: CartProduct[] = [];
    user: OrderUserContacts;
    pharmacy: PharmacyDetails;
    type: DeliveryType;

    delivery?: Delivery;
    payment: Payment;

    comment: string;

    constructor(savedCartJSON?: StructureType) {
        if (savedCartJSON) {
            this.setMainProperty(savedCartJSON)
            if (Array.isArray(savedCartJSON.products)) {
                this.setProducts(savedCartJSON.products as StructureType[]);
            }
        }
        //  })
    }

    private setMainProperty(savedCartJSON: StructureType) {
        this.user = savedCartJSON.user as any;
        this.pharmacy = savedCartJSON.pharmacy as any;
        this.type = savedCartJSON.type as any;
        this.delivery = savedCartJSON.delivery as any;
        this.payment = savedCartJSON.payment as any;
        this.comment = savedCartJSON.comment as any;

    }
    private setProducts(products: StructureType[]) {
        products.forEach(product => {
            let buildProduct;
            let productStock;
            if (product.type === ProductStockType.LOCAL) {
                buildProduct = new ProductBase({
                    id: product.productID,
                    title: product.title,
                    image: product.image,
                    type: product.type,
                    description: null,
                    isGNVLS: false,
                    isPrescription: false,
                    consignments: [
                        { id: null, pid: product.consigmentID, scu: null, quantity: product.quantity, price: +product.price / 100, GDATE: '2202-01-01T00:00:00.000Z' }
                    ],
                    supplierProducts: []
                });
                productStock = new ProductConsignment({ id: null, pid: product.consigmentID, scu: null, quantity: product.quantity, price: +product.price / 100, GDATE: '2202-01-01T00:00:00.000Z' })

            } else if (product.type === ProductStockType.SUPPLIER) {
                buildProduct = new ProductBase({
                    id: product.productID,
                    title: product.title,
                    image: product.image,
                    type: product.type,
                    description: null,
                    isGNVLS: false,
                    isPrescription: false,
                    consignments: [],
                    supplierProducts: [{ id: product.supplierProductID, contragentId: product.supplierPricelistID, quantity: product.quantity, price: +product.price / 100, GDATE: '2202-01-01T00:00:00.000Z' }]
                });
                productStock = new ProductSupplierItem({ id: product.supplierProductID, contragentId: product.supplierPricelistID, quantity: product.quantity, price: +product.price / 100, GDATE: '2202-01-01T00:00:00.000Z' })

            }
            this.products.push(new UserCartProduct(buildProduct, productStock, +product.quantity))
        })
    }
    actualizeCartProducts(products: Product[]) {
        const oldCartProducts = this.products;
        this.products = [];

        products.forEach(product => {
            let productInfo = oldCartProducts.find((item) => item.getProduct().getID() == product.getID());
            let productStocked: ProductStock = null;
            if (+productInfo.getProductStock().getType() === ProductStockType.LOCAL) {
                productStocked = product.getConsigments().find((item) => item.getConsignmentID() === productInfo.getProductStock().getConsignmentID())
                if (!productStocked && product.getConsigments().length > 0) productStocked = product.getConsigments()[0];
            } else if (+productInfo.getProductStock().getType() === ProductStockType.SUPPLIER) {
                productStocked = product.getSupplierProducts().find((item) => {
                    return item.getSupplierProductID() == productInfo.getProductStock().getSupplierProductID() &&
                        item.getSupplierPricelistID() == productInfo.getProductStock().getSupplierPricelistID()
                })
                if (!productStocked && product.getSupplierProducts().length > 0) productStocked = product.getSupplierProducts()[0];
            }
            if (productStocked) this.add(product, productStocked, +productInfo.getQuantity());
        });
    }

    getModel(): StructureType {

        const cartProductd: any[] = [];
        this.products.forEach((element: any) => {
            cartProductd.push((element as SerializeModel).getModel())
        })

        return {
            products: cartProductd,
            user: this.user as any,
            pharmacy: this.pharmacy as any,
            type: this.type,
            delivery: this.delivery as any,
            payment: this.payment as any,
            comment: this.comment
        }
    }

    add(product: Product, item: ProductStock, quantity: number): boolean {
        if (quantity < 1) return false;

        let findProduct = this.findByProduct(product).find((cartProduct: CartProduct) => {
            const stock = cartProduct.getProductStock();
            return (stock.getType() === ProductStockType.LOCAL && stock.getConsignmentID() === item.getConsignmentID()) ||
                (stock.getType() === ProductStockType.SUPPLIER && stock.getSupplierPricelistID() === item.getSupplierPricelistID() &&
                    stock.getSupplierProductID() === item.getSupplierProductID())
        });
        if (findProduct) {
            findProduct.setQuantity(quantity);
            return true;
        }
        this.products.unshift(new UserCartProduct(product, item, quantity));
        return true;

    }
    remove(item: CartProduct): boolean {
        const index = this.products.findIndex(cartProduct => {
            const productStock = cartProduct.getProductStock();
            const itemStock = item.getProductStock()
            if (itemStock.getType() == ProductStockType.LOCAL) {
                if (productStock.getConsignmentID() === itemStock.getConsignmentID()) return true;
            } else {
                if (productStock.getSupplierPricelistID() === itemStock.getSupplierPricelistID() &&
                    productStock.getSupplierProductID() === itemStock.getSupplierProductID()) return true;
            }
            return false;
        });
        if (index === -1) return false;
        delete this.products[index]
        return true;
    }
    findByProduct(item: Product): CartProduct[] {
        if (!this.products) return [];
        return this.products.filter(product => product.getProduct().getID() === item.getID())
    }
    getProducts(): CartProduct[] {
        return this.products;
    }
    clear(): void {
        this.products = [];
    }
    valid(): boolean {
        // TODO:Проверять на отсутствие дублирующихся позиций. Проверять, есть ли товары, проверять наличие телефона и по вариантам адреса 
        if (this.products.length === 0) return false;
        if (!this.user) return false;
        if (typeof this.user == undefined) return false;
        if (!/(\d{11,14})/.test(this.user.phone.replace(/(\D)+/g, ''))) return false;
        if (this.type === DeliveryType.DELIVERY) {
            if (!this.delivery) return false;
            if (!this.delivery.adress) return false;
        }
        return true;
    }

    getCountItems(): number {
        return this.products.length;
    }
    getAmount(): number {
        return this.products.reduce((summary, productCart) => summary + productCart.getAmount(), this.getDeliveryPrice());
    }
    getDeliveryPrice(): number {
        if (this.type === DeliveryType.DELIVERY) {
            return this.delivery.cost;
        }
        return 0;
    }
    setUserContacts(user: OrderUserContacts): boolean {
        this.user = user;
        return true;
    }
    setDelivery(delivery: Delivery): void {
        // TODO:  По адресу сделать запрос на создание Delivery и записать в Delivery 
        this.setDeliveryType(DeliveryType.DELIVERY);
        this.delivery = delivery;
    }
    setDeliveryType(type: DeliveryType) {
        this.type = type;
    }
    getDelivery(): Delivery {
        return this.delivery;
    }
    private setPharmacyDetails(pharmacy: PharmacyDetails): void {
        if (this.products.length != 0) throw new Error("Pharmacy can not by added");
        this.pharmacy = pharmacy;
    }
    changePharmacyDetails(pharmacy: PharmacyDetails): ProductDecided[] {
        if (this.pharmacy.id == pharmacy.id) return null;
        if (this.products.length === 0) {
            this.setPharmacyDetails(pharmacy);
            return null;
        }
        const desided: CartProductDecided[] = [];
        this.products.forEach(item => desided.push(new CartProductDecided(item.getProduct(), item.getProductStock(), item.getQuantity())));
        return desided;
    }

    changePharmacyApply(pharmacy: PharmacyDetails, producStockDecided: ProductDecided[]): boolean {
        this.products = [];
        producStockDecided.forEach(producStockDecided => {
            if (producStockDecided.getDesided() === DecidedType.CHANGED) {
                this.products.push(new UserCartProduct(producStockDecided.getProduct(), producStockDecided.getSelectedProductStock(), producStockDecided.getQuantity()));
            }
        })
        this.pharmacy = pharmacy;
        if (this.valid()) return true;
    }

}