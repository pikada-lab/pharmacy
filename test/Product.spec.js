var assert = require('assert');
const Product = require('../dist/entities/ProductBase').default
describe(' Проверка класса товара на складе в аптеке', function () {
    const pc = new Product({
        id: 12,
        title: 'Tetarubuin',
        image: 'product-154474.jpg',
        description: 'Описание товара Тетарабуина',
        isGNVLS: false,
        isPrescription: true,
        supplierProducts: [{id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z'}, {id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z'}],
        consignments: [{id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z'}]
    });
    describe('ProductBase', function () {
        it('.getID() === 12', () => {
            assert.equal(pc.getID(), 12);
        });
        it('.getTitle() === Tetarubuin', () => {
            assert.equal(pc.getTitle(), 'Tetarubuin');
        });
        it('.getImage() === product-154474.jpg', () => {
            assert.equal(pc.getImage(), 'product-154474.jpg');
        });
        it('.getDescription() === Описание товара Тетарабуина', () => {
            assert.equal(pc.getDescription(), 'Описание товара Тетарабуина');
        });
        it('.getGNVLS() === false', () => {
            assert.equal(pc.getGNVLS(), false);
        });
        it('.getPrescription() === true', () => {
            assert.equal(pc.getPrescription(), true);
        });
        it('.getSupplierProducts() === ', () => {
            assert.deepEqual(pc.getSupplierProducts(), [{id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z'}, {id: '54585A4', contragentId: 22, quantity: 8, price: 19.20, GDATE: '2020-01-04T00:00:00.000Z'}]);
        });
        it('.getConsigments() === ', () => {
            assert.deepEqual(pc.getConsigments(), [{id: 12, pid: '100200346412', scu: 101, quantity: 28, price: 19.20, GDATE: '2020-01-04T00:00:00.000z'}]);
        });
        it('.getModel() === {***}', () => {
            assert.deepEqual(pc.getModel(), {
                id: 12,
                title: 'Tetarubuin',
                image: 'product-154474.jpg',
                description: 'Описание товара Тетарабуина',
                isGNVLS: false,
                isPrescription: true
            });
        });
    });
});
