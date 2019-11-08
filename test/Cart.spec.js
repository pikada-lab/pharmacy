var assert = require('assert');
const TestStructureBuilder = require('./structure.spec');
const UserCart = require('../dist/entities/UserCart').default;
const Product = require('../dist/entities/ProductBase').default;
const ProductConsignment = require('../dist/entities/ProductConsignment').default;
const ProductSupplierItem = require('../dist/entities/ProductSupplierItem').default;
const UserCartProduct = require('../dist/entities/UserCartProduct').default;
describe('Проверка основных функций корзины', function () {
    const product = new Product({
        id: 12,
        title: 'Tetarubuin',
        image: 'product-154474.jpg',
        description: 'Описание товара Тетарабуина',
        isGNVLS: false,
        isPrescription: true,
        supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }],
        consignments: [{ id: 12, pid: 100200346412, scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' }]
    });
    const productStockConsignment = new ProductConsignment({ id: 12, pid: 100200346412, scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' });
    const productStockSupplier = new ProductSupplierItem({ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' });
    const cartProduct = new UserCartProduct(product, productStockConsignment, 18);

    const pc = new UserCart({
        user: TestStructureBuilder.userContacts,
        pharmacy: TestStructureBuilder.pharmacy,
        type: 1,
        delivery: null,
        payment: TestStructureBuilder.payment,
        comment: 'Комментарий к заказу в корзине',
        products: [{
            id: null,
            title: 'Tetarubuin',
            image: 'product-154474.jpg',
            productID: 12,
            type: 1,
            consigmentID: 100200346412,
            supplierProductID: null,
            supplierPricelistID: null,
            price: 1920,
            quantity: 18
        }]
    });
    describe('UserCart', function () {


        it('.findByProduct() === true', () => {
            assert.deepEqual(pc.findByProduct(product)[0].getModel(), cartProduct.getModel());
        });
        it('.add() === true', () => {
            assert.equal(pc.add(product, productStockConsignment, 2), true);
        });
        it('.remove() === true', () => {
            assert.equal(pc.remove(cartProduct), true);
        });
        // it('.getProducts() === 0', () => {
        //     assert.equal(pc.getProducts(), TestStructureBuilder.cartProduct1);
        // });
        it('.clear() => .getProducts() === []', () => {
            pc.clear();
            assert.deepEqual(pc.getProducts(), []);
        });
        it('.valid() === false', () => {
            assert.equal(pc.valid(), false);
        });
        it('.add() === true', () => {
            assert.equal(pc.add(product, productStockSupplier, 10), true);
        });
        it('.getCountItems() === 1', () => {
            assert.equal(pc.getCountItems(), 1);
        });
        it('.getAmount() === 15360', () => {
            assert.equal(pc.getAmount(), 15360);
        });
        it('.getQuantity() === 8', () => {
            assert.equal(pc.findByProduct(product)[0].getQuantity(), 8);
        });
        it('.setDelivery() => .getDeliveryPrice() == 3000 ', () => {
            pc.setDelivery(TestStructureBuilder.deliveryCart)
            assert.equal(pc.getDeliveryPrice(), 3000);
        });
        it('.setDelivery() => .getDelivery() === {***}', () => {
            pc.setDelivery(TestStructureBuilder.delivery)
            assert.deepEqual(pc.getDelivery(), TestStructureBuilder.delivery);
        });

        it('.setUserContacts() => .getModel() === {***}', () => {
            pc.setUserContacts(TestStructureBuilder.userContacts)
            pc.setDeliveryType(1);
            assert.deepEqual(pc.getModel(), {
                products: [{
                    consigmentID: null,
                    id: null,
                    image: 'product-154474.jpg',
                    price: 1920,
                    productID: 12,
                    quantity: 8,
                    supplierPricelistID: 22,
                    supplierProductID: '54585A4',
                    title: 'Tetarubuin',
                    type: 2
                }],
                user: TestStructureBuilder.userContacts,
                pharmacy: TestStructureBuilder.pharmacy,
                type: 1,
                delivery: TestStructureBuilder.delivery,
                payment: TestStructureBuilder.payment,
                comment: 'Комментарий к заказу в корзине',
            });
        });
        // it('.changePharmacyDetails() === ', () => {
        //     assert.equal(pc.changePharmacyDetails({
        //         id: 9,
        //         name: 'New Pharm'
        //     }), [{
        //          changedProduct: {

        // }
        //         productStock: {
        //             GDATE: "2020-01-04T00:00:00.000Z",
        //             contragentId: 22,
        //             id: "54585A4",
        //             price: 19.2,
        //             quantity: 8
        //         },  
        //         visible: true, 
        //         lock: true,
        //         quantity: 8
        //     }
        //     ]);
        // });

        // it('.changePharmacyApply() === ', () => {
        //     assert.equal(pc.changePharmacyApply());
        // });
    });
});
