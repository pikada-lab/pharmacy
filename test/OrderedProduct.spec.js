var assert = require('assert');
const OrderedProduct = require('../dist/entities/OrderedProduct').default
describe(' Проверка класса товара на складе в аптеке', function () {
    const pc = new OrderedProduct({
        id: 12,
        productID: 15152422,
        title: 'Tetarubuin',
        image: 'product-154474.jpg',
        isPrescription: true,
        stockType: 1,
        consigmentID: 45884,
        
        price: 54.55,
        quantity: 3,

        status: 5
    });
    describe('OrderedProduct', function () {
        it('.getQuantity() === 3', () => {
            assert.equal(pc.getQuantity(), 3);
        });
        it('.getPrice() === 5455', () => {
            assert.equal(pc.getPrice(), 5455);
        });
        it('.getAmount() === 16365', () => {
            assert.equal(pc.getAmount(), 16365);
        });
        it('.getStatus() === 5', () => {
            assert.equal(pc.getStatus(), 5);
        });
        it('.setQuantity() === 4', () => {
            pc.setQuantity(4);
            assert.equal(pc.getQuantity(), 4);
        });
        it('.getModel() === {***}', () => {
            assert.deepEqual(pc.getModel(), {
                id: 12,
                productID: 15152422,
                title: 'Tetarubuin',
                image: 'product-154474.jpg',
                isPrescription: true,
                stockType: 1,
                consigmentID: 45884,
                supplierProductID: undefined,
                supplierPricelistID: undefined,
                price: 54.55,
                quantity: 4,

                status: 5
            });
        });
    });
});
