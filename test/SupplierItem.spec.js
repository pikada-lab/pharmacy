var assert = require('assert');
const SupplierItem = require('../dist/entities/ProductSupplierItem').default
describe(' Проверка класса товар на складе поставщика', function () {
    const pc = new SupplierItem({
        id: '54585A4',
        contragentId: 22,
        quantity: 8,
        price: 19.20,
        GDATE: '2020-01-04T00:00:00.000z'
    });
    describe('ProductSupplierItem', function () {
        it('.getType() === 2', () => {
            assert.equal(pc.getType(), 2);
        });
        it('.getConsignmentID() === null', () => {
            assert.equal(pc.getConsignmentID(), null);
        });
        it('.getSupplierPricelistID() === 54585A4', () => {
            assert.equal(pc.getSupplierPricelistID(), 22);
        });
        it('.getSupplierProductID() === 54585A4', () => {
            assert.equal(pc.getSupplierProductID(), '54585A4');
        });
        it('.getPrice() === 1920', () => {
            assert.equal(pc.getPrice(), 1920);
        });
        it('.getGDATE() === 2020-01-04T00:00:00.000Z', () => {
            assert.equal(pc.getGDATE().toJSON(), '2020-01-04T00:00:00.000Z');
        });
        it('.getQuantityMax() === 8', () => {
            assert.equal(pc.getQuantityMax(), 8);
        });
        it('.getModel() === {***}', () => {
            assert.deepEqual(pc.getModel(), {
                id: '54585A4',
                contragentId: 22,
                quantity: 8,
                price: 19.20,
                GDATE: '2020-01-04T00:00:00.000Z'
            });
        });
    });
});
