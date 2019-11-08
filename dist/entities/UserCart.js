"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryType_enum_1 = require("../enums/DeliveryType.enum");
const UserCartProduct_1 = require("./UserCartProduct");
const ProductStockType_enum_1 = require("../enums/ProductStockType.enum");
const CartProductDecided_1 = require("./CartProductDecided");
const ProductDecided_interface_1 = require("../interfaces/ProductDecided.interface");
const ProductBase_1 = require("./ProductBase");
const ProductConsignment_1 = require("./ProductConsignment");
const ProductSupplierItem_1 = require("./ProductSupplierItem");
class UserCart {
    constructor(savedCartJSON) {
        this.products = [];
        if (savedCartJSON) {
            this.setMainProperty(savedCartJSON);
            if (Array.isArray(savedCartJSON.products)) {
                this.setProducts(savedCartJSON.products);
            }
        }
        //  })
    }
    setMainProperty(savedCartJSON) {
        this.user = savedCartJSON.user;
        this.pharmacy = savedCartJSON.pharmacy;
        this.type = savedCartJSON.type;
        this.delivery = savedCartJSON.delivery;
        this.payment = savedCartJSON.payment;
        this.comment = savedCartJSON.comment;
    }
    setProducts(products) {
        products.forEach(product => {
            let buildProduct;
            let productStock;
            if (product.type === ProductStockType_enum_1.ProductStockType.LOCAL) {
                buildProduct = new ProductBase_1.default({
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
                productStock = new ProductConsignment_1.default({ id: null, pid: product.consigmentID, scu: null, quantity: product.quantity, price: +product.price / 100, GDATE: '2202-01-01T00:00:00.000Z' });
            }
            else if (product.type === ProductStockType_enum_1.ProductStockType.SUPPLIER) {
                buildProduct = new ProductBase_1.default({
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
                productStock = new ProductSupplierItem_1.default({ id: product.supplierProductID, contragentId: product.supplierPricelistID, quantity: product.quantity, price: +product.price / 100, GDATE: '2202-01-01T00:00:00.000Z' });
            }
            this.products.push(new UserCartProduct_1.default(buildProduct, productStock, +product.quantity));
        });
    }
    actualizeCartProducts(products) {
        const oldCartProducts = this.products;
        this.products = [];
        products.forEach(product => {
            let productInfo = oldCartProducts.find((item) => item.getProduct().getID() == product.getID());
            let productStocked = null;
            if (+productInfo.getProductStock().getType() === ProductStockType_enum_1.ProductStockType.LOCAL) {
                productStocked = product.getConsigments().find((item) => item.getConsignmentID() === productInfo.getProductStock().getConsignmentID());
                if (!productStocked && product.getConsigments().length > 0)
                    productStocked = product.getConsigments()[0];
            }
            else if (+productInfo.getProductStock().getType() === ProductStockType_enum_1.ProductStockType.SUPPLIER) {
                productStocked = product.getSupplierProducts().find((item) => {
                    return item.getSupplierProductID() == productInfo.getProductStock().getSupplierProductID() &&
                        item.getSupplierPricelistID() == productInfo.getProductStock().getSupplierPricelistID();
                });
                if (!productStocked && product.getSupplierProducts().length > 0)
                    productStocked = product.getSupplierProducts()[0];
            }
            if (productStocked)
                this.add(product, productStocked, +productInfo.getQuantity());
        });
    }
    getModel() {
        const cartProductd = [];
        this.products.forEach((element) => {
            cartProductd.push(element.getModel());
        });
        return {
            products: cartProductd,
            user: this.user,
            pharmacy: this.pharmacy,
            type: this.type,
            delivery: this.delivery,
            payment: this.payment,
            comment: this.comment
        };
    }
    add(product, item, quantity) {
        if (quantity < 1)
            return false;
        let findProduct = this.findByProduct(product).find((cartProduct) => {
            const stock = cartProduct.getProductStock();
            return (stock.getType() === ProductStockType_enum_1.ProductStockType.LOCAL && stock.getConsignmentID() === item.getConsignmentID()) ||
                (stock.getType() === ProductStockType_enum_1.ProductStockType.SUPPLIER && stock.getSupplierPricelistID() === item.getSupplierPricelistID() &&
                    stock.getSupplierProductID() === item.getSupplierProductID());
        });
        if (findProduct) {
            findProduct.setQuantity(quantity);
            return true;
        }
        this.products.unshift(new UserCartProduct_1.default(product, item, quantity));
        return true;
    }
    remove(item) {
        const index = this.products.findIndex(cartProduct => {
            const productStock = cartProduct.getProductStock();
            const itemStock = item.getProductStock();
            if (itemStock.getType() == ProductStockType_enum_1.ProductStockType.LOCAL) {
                if (productStock.getConsignmentID() === itemStock.getConsignmentID())
                    return true;
            }
            else {
                if (productStock.getSupplierPricelistID() === itemStock.getSupplierPricelistID() &&
                    productStock.getSupplierProductID() === itemStock.getSupplierProductID())
                    return true;
            }
            return false;
        });
        if (index === -1)
            return false;
        delete this.products[index];
        return true;
    }
    findByProduct(item) {
        if (!this.products)
            return [];
        return this.products.filter(product => product.getProduct().getID() === item.getID());
    }
    getProducts() {
        return this.products;
    }
    clear() {
        this.products = [];
    }
    valid() {
        // TODO:Проверять на отсутствие дублирующихся позиций. Проверять, есть ли товары, проверять наличие телефона и по вариантам адреса 
        if (this.products.length === 0)
            return false;
        if (!this.user)
            return false;
        if (typeof this.user == undefined)
            return false;
        if (!/(\d{11,14})/.test(this.user.phone.replace(/(\D)+/g, '')))
            return false;
        if (this.type === DeliveryType_enum_1.DeliveryType.DELIVERY) {
            if (!this.delivery)
                return false;
            if (!this.delivery.adress)
                return false;
        }
        return true;
    }
    getCountItems() {
        return this.products.length;
    }
    getAmount() {
        return this.products.reduce((summary, productCart) => summary + productCart.getAmount(), this.getDeliveryPrice());
    }
    getDeliveryPrice() {
        if (this.type === DeliveryType_enum_1.DeliveryType.DELIVERY) {
            return this.delivery.cost;
        }
        return 0;
    }
    setUserContacts(user) {
        this.user = user;
        return true;
    }
    setDelivery(delivery) {
        // TODO:  По адресу сделать запрос на создание Delivery и записать в Delivery 
        this.setDeliveryType(DeliveryType_enum_1.DeliveryType.DELIVERY);
        this.delivery = delivery;
    }
    setDeliveryType(type) {
        this.type = type;
    }
    getDelivery() {
        return this.delivery;
    }
    setPharmacyDetails(pharmacy) {
        if (this.products.length != 0)
            throw new Error("Pharmacy can not by added");
        this.pharmacy = pharmacy;
    }
    changePharmacyDetails(pharmacy) {
        if (this.pharmacy.id == pharmacy.id)
            return null;
        if (this.products.length === 0) {
            this.setPharmacyDetails(pharmacy);
            return null;
        }
        const desided = [];
        this.products.forEach(item => desided.push(new CartProductDecided_1.default(item.getProduct(), item.getProductStock(), item.getQuantity())));
        return desided;
    }
    changePharmacyApply(pharmacy, producStockDecided) {
        this.products = [];
        producStockDecided.forEach(producStockDecided => {
            if (producStockDecided.getDesided() === ProductDecided_interface_1.DecidedType.CHANGED) {
                this.products.push(new UserCartProduct_1.default(producStockDecided.getProduct(), producStockDecided.getSelectedProductStock(), producStockDecided.getQuantity()));
            }
        });
        this.pharmacy = pharmacy;
        if (this.valid())
            return true;
    }
}
exports.default = UserCart;
//# sourceMappingURL=UserCart.js.map