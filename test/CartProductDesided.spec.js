var assert = require('assert');

const Product = require('../dist/entities/ProductBase').default;
const ProductConsignment = require('../dist/entities/ProductConsignment').default;
const ProductSupplierItem = require('../dist/entities/ProductSupplierItem').default;
const UserCartProduct = require('../dist/entities/UserCartProduct').default;
const CartProductDecided = require('../dist/entities/CartProductDecided').default;
const product = new Product({
    id: 124,
    title: 'Tetarubuin',
    image: 'product-154474.jpg',
    description: 'Описание товара Тетарабуина',
    isGNVLS: false,
    isPrescription: true,
    supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }],
    consignments: [{ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' }]
});
const productNew = new Product({
    id: 124,
    title: 'Tetarubuin',
    image: 'product-154474.jpg',
    description: 'Описание товара Тетарабуина',
    isGNVLS: false,
    isPrescription: true,
    supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A3', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }],
    consignments: [{ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 29.20, GDATE: '2020-01-04T00:00:00.000z' }]
});
const productNewConsigment = new Product({
    id: 124,
    title: 'Tetarubuin',
    image: 'product-154474.jpg',
    description: 'Описание товара Тетарабуина',
    isGNVLS: false,
    isPrescription: true,
    supplierProducts: [],
    consignments: [{ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 17.20, GDATE: '2020-01-04T00:00:00.000z' }]
});
const productNewSupplier = new Product({
    id: 124,
    title: 'Tetarubuin',
    image: 'product-154474.jpg',
    description: 'Описание товара Тетарабуина',
    isGNVLS: false,
    isPrescription: true,
    supplierProducts: [{ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A3', contragentId: 22, quantity: 18, price: 12.20, GDATE: '2020-01-04T00:00:00.000Z' }],
    consignments: []
});
  const productStockConsignment = new ProductConsignment({ id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z' });
const productStockSupplier = new ProductSupplierItem({ id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' }, { id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z' });
// const pc = new UserCartProduct(product, productStockSupplier, 18 );
describe(' Проверка базового класса, для принятия решений по товарам корзины.', function () {
    const pc = new CartProductDecided(product, productStockSupplier, 4);
    describe('OrderedProduct', function () {
        it('.getProduct() === Product', () => {
            assert.deepEqual(pc.getProduct(), product);
        });
        it('.getDesided() === undefined', () => {
            assert.equal(pc.getDesided(), undefined);
        });
        it('.getSelectedProductStock() === undefined', () => {
            assert.deepEqual(pc.getSelectedProductStock(), undefined);
        });
        it('.getProductID() === 124', () => {
            assert.equal(pc.getProductID(), 124);
        });
        it('.getQuantity() === 18', () => {
            assert.equal(pc.getQuantity(), 4);
        });

        it('.getDesided() === 2', () => {
            pc.setNewProduct()
            assert.equal(pc.getDesided(), 2);
        });

        it('.getDesided() === 1', () => {
            pc.setNewProduct(productNew)
            assert.equal(pc.getDesided(), 1);
        });
        it('.getSelectedProductStock() === undefined', () => {
            assert.deepEqual(pc.getSelectedProductStock(), {
                id: 12,
                pid: 100200346412,
                scu: 101,
                quantity: 28,
                price: 29.2,
                GDATE: '2020-01-04T00:00:00.000z'
            });
        });
        it('.getDesided() === 1', () => {
            pc.setNewProduct(productNewConsigment);
            assert.equal(pc.getDesided(), 1);
        });

        it('.getSelectedProductStock() === !undefined', () => {
            assert.deepEqual(pc.getSelectedProductStock(), { id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 17.20, GDATE: '2020-01-04T00:00:00.000z' });
        });
        it('.getDesided() === 1', () => {
            pc.setNewProduct(productNewSupplier);
            assert.equal(pc.getDesided(), 1);
        });

        it('.getSelectedProductStock() === !undefined', () => {
            assert.deepEqual(pc.getSelectedProductStock(), { id: '54585A3', contragentId: 22, quantity: 18, price: 12.20, GDATE: '2020-01-04T00:00:00.000Z' });
        });
        it('.getDesided() === 1', () => {
            pc.setNewProduct(productNewConsigment);
            assert.equal(pc.getDesided(), 1);
        });

        it('.getSelectedProductStock() === !undefined', () => {
            assert.deepEqual(pc.getSelectedProductStock(), { id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 17.20, GDATE: '2020-01-04T00:00:00.000z' });
        });
        it('.visible  === 0', () => { 
            assert.equal(pc.visible, true);
        });
        it('.visible  === 1', () => {
            const pc2 = new CartProductDecided(product, productStockConsignment, 4);
            pc2.setNewProduct(product);
            assert.equal(pc2.visible, false);
        });

    });
});
