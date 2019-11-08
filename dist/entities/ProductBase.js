"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductConsignment_1 = require("./ProductConsignment");
const ProductSupplierItem_1 = require("./ProductSupplierItem");
class ProductBase {
    constructor(structure) {
        this.id = +structure.id;
        this.title = structure.title;
        this.image = structure.image;
        this.description = structure.description;
        this.isGNVLS = structure.isGNVLS;
        this.isPrescription = structure.isPrescription;
        this.supplierProducts = [];
        if (typeof structure.supplierProducts != undefined && Array.isArray(structure.supplierProducts)) {
            structure.supplierProducts.forEach(element => {
                this.supplierProducts.push(new ProductSupplierItem_1.default(element));
            });
        }
        this.consignments = [];
        if (typeof structure.consignments != undefined && Array.isArray(structure.consignments)) {
            structure.consignments.forEach(element => {
                this.consignments.push(new ProductConsignment_1.default(element));
            });
        }
    }
    getModel() {
        const supplierProducts = [];
        const consignments = [];
        this.supplierProducts.forEach((element) => {
            supplierProducts.push(element.getModel());
        });
        this.consignments.forEach((element) => {
            consignments.push(element.getModel());
        });
        return {
            id: this.id,
            title: this.title,
            image: this.image,
            description: this.description,
            isGNVLS: this.isGNVLS,
            isPrescription: this.isPrescription
        };
    }
    getID() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getImage() {
        return this.image;
    }
    getDescription() {
        return this.description;
    }
    getGNVLS() {
        return this.isGNVLS;
    }
    getPrescription() {
        return this.isPrescription;
    }
    getSupplierProducts() {
        return this.supplierProducts;
    }
    getConsigments() {
        return this.consignments;
    }
    getProduct() {
        return {
            title: this.getTitle()
        };
    }
}
exports.default = ProductBase;
//# sourceMappingURL=ProductBase.js.map