var assert = require('assert');
const ProductConsignment = require('../dist/entities/ProductConsignment').default
describe(' Проверка класса товара на складе в аптеке', function () {
    const pc = new ProductConsignment({
        id: 12,
        pid: '100200346412',
        scu: 101,
        quantity: 28,
        price: 19.20,
        GDATE: '2020-01-04T00:00:00.000z'
    });
    describe('ProductConsignment', function () {
        it('.getType() === 1', () => {
            assert.equal(pc.getType(), 1);
        });
        it('.getConsignmentID() === 100200346412', () => {
            assert.equal(pc.getConsignmentID(), 100200346412);
        });
        it('.getSupplierPricelistID() === null', () => {
            assert.equal(pc.getSupplierPricelistID(), null);
        });
        it('.getSupplierProductID() === null', () => {
            assert.equal(pc.getSupplierProductID(), null);
        });
        it('.getPrice() === 1920', () => {
            assert.equal(pc.getPrice(), 1920);
        });
        it('.getGDATE() === 1920', () => {
            assert.equal(pc.getGDATE().toJSON(), '2020-01-04T00:00:00.000Z');
        });
        it('.getQuantityMax() === 28', () => {
            assert.equal(pc.getQuantityMax(), 28);
        });
        it('.getModel() === {***}', () => {
            assert.deepEqual(pc.getModel(), {
                id: 12,
                pid: 100200346412,
                scu: 101,
                quantity: 28,
                price: 19.20,
                GDATE: '2020-01-04T00:00:00.000Z'
            });
        });
    });
});
